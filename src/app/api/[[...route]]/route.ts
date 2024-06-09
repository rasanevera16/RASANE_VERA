import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { prettyJSON } from "hono/pretty-json";

import products from "./products";
import about from "./about";
import privacyPolicy from "./privacy-policy";
import termsOfService from "./terms-of-service";
import reviews from "./reviews";

const app = new Hono().basePath("/api");

// app.use("*", async (c, next) => {
//   const corsMiddleware = cors({
//     origin: ["http://localhost:3000", "https://rasane-vera.netlify.app"],
//     allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     allowHeaders: ["Origin", "Content-Type", "x-api-key", "Application/json"],
//     exposeHeaders: ["Content-Length"],
//     maxAge: 600,
//     credentials: true,
//   });

//   await corsMiddleware(c, next);
// });
app.use(secureHeaders());
app.use(logger());
app.use(prettyJSON());

app.route("/products", products);
app.route("/about", about);
app.route("/privacy-policy", privacyPolicy);
app.route("/terms-of-service", termsOfService);
app.route("/reviews", reviews);

app.notFound((c) => {
  c.status(404);
  return c.json({
    errors: true,
    message: "Endpoint not found",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
