import { Hono } from "hono";
import { sign } from "hono/jwt";
import { getPrisma } from "../services/database";
import { signupInput } from "@apophis30/common";

const signUp = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

signUp.post("/signup", async (c) => {

  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Email and password are required." });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return c.json({
        message: "User Already Exists",
      });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        ...(body.name && { name: body.name }),
      },
    });
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = await sign(payload, c.env.JWT_SECRET);
    return c.json({
      token,
    });
  } catch (err) {
    c.status(403);
    console.error(err);
    return c.json({ error: "Error while signing up" });
  }
});

export default signUp;