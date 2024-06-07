import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import bycrypt from "bcryptjs";

import { privacyPolicy, termsOfService, users } from "./schema";

config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

const db = drizzle(sql);

const SEED_USERS = [
  {
    name: "Admin Rasane Vera",
    email: "namikulobima12@gmail.com",
    password: bycrypt.hashSync("AdminRasaneVera123*", 10),
    confirmPassword: "AdminRasaneVera123*",
    role: "admin",
    emailVerified: new Date(),
  },
  {
    name: "Mount Vera Sejati",
    email: "rasanevera16@gmail.com",
    password: bycrypt.hashSync("MountVeraSejati123*", 10),
    confirmPassword: "MountVeraSejati123*",
    role: "admin",
    emailVerified: new Date(),
  },
];

const SEED_PRIVACY_POLICY = [
  {
    description: "Privacy Policy",
  },
];

const SEED_TERMS_AND_CONDITIONS = {
  description: "Terms and Conditions",
};

const main = async () => {
  try {
    // await db.insert(users).values(SEED_USERS).execute();

    await db.insert(privacyPolicy).values(SEED_PRIVACY_POLICY).execute();
    await db.insert(termsOfService).values(SEED_TERMS_AND_CONDITIONS).execute();
  } catch (error: unknown) {
    console.error("Error during seed: ", error);
    process.exit(1);
  }
};

main().then(() => {
  console.log("Seed completed");
  process.exit(0);
});
