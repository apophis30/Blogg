import { Hono } from "hono";
import { sign } from "hono/jwt";
import { getPrisma } from "../services/database";

const signIn = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

signIn.post("/signin", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    if (!body.email || !body.password) {
        return c.json(
            {
                message: "Email and Password Are Required Fields",
            },
            400
        );
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!existingUser) {
            c.status(403);
            return c.json({ error: "User Not Found" });
        }
        if (existingUser.password != body.password) {
            c.status(403);
            return c.json({ error: "Wrong Password" });
        }
        const payload = {
            id: existingUser.id,
            email: existingUser.email,
        };
        console.log(payload.id);
        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({
            token,
        });
    } catch (err) {
        c.status(403);
        console.error(err);
        return c.json({ error: "Error while signing in" });
    }
});

export default signIn;
