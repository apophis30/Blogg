import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "Invalid token payload" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (err) {
    c.status(401);
    return c.json({ error: "Invalid or expired token" });
  }
};
