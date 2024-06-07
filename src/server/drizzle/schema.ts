import {
  boolean,
  pgTable,
  text,
  integer,
  timestamp,
  index,
  uniqueIndex,
  pgEnum,
  real,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import * as z from "zod";

import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: text("role").default("user"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email_idx").on(user.email),
  }),
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull().unique(),
    providerAccountId: text("providerAccountId").notNull().unique(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId_idx",
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId_unq").on(account.userId),
  }),
);

export const sessions = pgTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  sessionToken: text("sessionToken").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$defaultFn(() => new Date())
    .notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (vt) => ({
    emailTokenIndex: uniqueIndex("verification_tokens__email__token_idx").on(
      vt.email,
      vt.token,
    ),
  }),
);

export const products = pgTable(
  "products",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    price: real("price").notNull(),
    slug: text("slug").notNull(),
    shortDescription: text("shortDescription").notNull(),
    description: text("description").notNull(),
    coverImageUrl: text("coverImageUrl").notNull(),
    coverImageName: text("coverImageName").notNull(),
    isFeatured: boolean("isFeatured").default(false).notNull(),
    isArchived: boolean("isArchived").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (product) => ({
    slugIndex: uniqueIndex("products__slug_unq").on(product.slug),
    userIdIndex: index("products__userId_unq").on(product.userId),
  }),
);

export const productImages = pgTable(
  "product_images",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (pi) => ({
    productIdIndex: index("products_images__productId_unq").on(pi.productId),
  }),
);

export const reviews = pgTable(
  "reviews",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    rating: real("rating").notNull(),
    comment: text("comment").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (review) => ({
    productIdIndex: index("reviews__productId_unq").on(review.productId),
  }),
);

export const statusEnum = pgEnum("status", [
  "pending",
  "succeeded",
  "cancelled",
]);

export const orders = pgTable(
  "orders",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    customerName: text("customerName").notNull(),
    totalOrder: integer("totalOrder").notNull(),
    totalPrice: real("totalPrice").notNull(),
    date: timestamp("date", { mode: "date" }).notNull(),
    status: statusEnum("status").default("pending").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (cr) => ({
    userIdIndex: index("customers_recap__userId_unq").on(cr.userId),
  }),
);

export const orderItems = pgTable(
  "order_items",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    orderId: text("orderId")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (oi) => ({
    orderIdIndex: index("order_items__orderId_unq").on(oi.orderId),
    productIdIndex: index("order_items__productId_unq").on(oi.productId),
  }),
);

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const about = pgTable("about", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  youtubeUrl: text("youtubeUrl").notNull(),
  description: text("description").notNull(),
  vision: text("vision").notNull(),
  mission: text("mission").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$defaultFn(() => new Date())
    .notNull(),
});

export const aboutAchievements = pgTable(
  "about_achievements",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    aboutId: text("aboutId")
      .notNull()
      .references(() => about.id, { onDelete: "cascade" }),
    count: integer("count").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (aa) => ({
    aboutIdIndex: index("about_achievements__aboutId_unq").on(aa.aboutId),
  }),
);

export const privacyPolicy = pgTable("privacy_policy", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$defaultFn(() => new Date())
    .notNull(),
});

export const termsOfService = pgTable("terms_of_service", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$defaultFn(() => new Date())
    .notNull(),
});

/** Schema Validations With Zod */

// Schema Validation for User
export const selectUserSchema = createSelectSchema(users, {
  email: (schema) => schema.email.email(),
});

// Schema Validation for Product
export const insertProductImageSchema = createSelectSchema(productImages).omit({
  id: true,
  productId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSchema = createSelectSchema(products)
  .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
  .extend({
    productImages: z.array(insertProductImageSchema),
  });

// Schema Validation for Order
export const insertOrderItemSchema = createSelectSchema(orderItems).omit({
  id: true,
  orderId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createSelectSchema(orders)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    orderItems: z.array(insertOrderItemSchema),
  });

// Schema Validation for About
export const insertAboutAchievementSchema = createSelectSchema(
  aboutAchievements,
).omit({
  id: true,
  aboutId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAboutSchema = createSelectSchema(about).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema Validation for Privacy Policy
export const insertPrivacyPolicySchema = createSelectSchema(privacyPolicy).omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  },
);

// Schema Validation for Terms of Service
export const insertTermsOfServiceSchema = createSelectSchema(
  termsOfService,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema Validation for Reviews
export const insertReviewSchema = createSelectSchema(reviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/** Values Schema */
export type InsertProductValues = z.infer<typeof insertProductSchema>;
export type InsertOrderValues = z.infer<typeof insertOrderSchema>;
export type InsertAboutValues = z.infer<typeof insertAboutSchema>;
export type InsertAboutAchievementValues = z.infer<
  typeof insertAboutAchievementSchema
>;
export type InsertPrivacyPolicyValues = z.infer<
  typeof insertPrivacyPolicySchema
>;
export type InsertTermsOfServiceValues = z.infer<
  typeof insertTermsOfServiceSchema
>;
export type InsertReviewValues = z.infer<typeof insertReviewSchema>;

/** Relations Database */
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  products: many(products),
  orders: many(orders),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const productsRelations = relations(products, ({ many, one }) => ({
  productImages: many(productImages),
  reviews: many(reviews),
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
}));

export const productsImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const aboutRelations = relations(about, ({ many }) => ({
  aboutAchievements: many(aboutAchievements),
}));

export const aboutAchievementsRelations = relations(
  aboutAchievements,
  ({ one }) => ({
    about: one(about, {
      fields: [aboutAchievements.aboutId],
      references: [about.id],
    }),
  }),
);
