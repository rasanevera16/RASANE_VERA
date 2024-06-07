import { Context, Next } from "hono";
import { includes } from "lodash";
import { HTTPException } from "hono/http-exception";

export const honoMiddleware = async (c: Context, next: Next) => {
  try {
    const apiKey = c.req.header("x-api-key") || "";
    if (!includes(apiKey, process.env.AUTH_SECRET!)) {
      return c.json(
        {
          error: "You are not authorized to access this route. Access Denied!",
        },
        401,
      );
    }
  } catch (error) {
    throw new HTTPException(500, {
      message: "An error occurred while processing your request.",
    });
  }

  return await next();
};
