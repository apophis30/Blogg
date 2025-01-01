import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { getPrisma } from "../services/database";
import { createPostInput, updatePostInput } from "@apophis30/common";

const blog = new Hono();
const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.post("/", authMiddleware, async(c) => {
    const userId = c.get('userId')
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success } = createPostInput.safeParse(body)
    if(!success){
        c.status(400);
		return c.json({ error: "Invalid blog post inputs" });
    }
    try {
        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            message: "Post Created",
            postId: post.id,
        });
    } catch (err) {
        c.status(403);
        console.error(err);
        return c.json({ error: "Error while creating post" });
    }
});

blogRouter.put("/", authMiddleware, async(c) => {
    const userId = c.get('userId')
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success } = updatePostInput.safeParse(body)
    if(!success){
        c.status(400);
		return c.json({ error: "Invalid update blog post inputs" })
    }
    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            message: "Post Updated",
        });
    } catch (err) {
        c.status(403);
        console.error(err);
        return c.json({ error: "Error while updating post" });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const posts = await prisma.post.findMany()
        return c.json(posts);
    } catch (err) {
        c.status(403);
        console.error(err);
        return c.json({ error: "Error getting bulk posts" });
    }
});

blogRouter.get("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    console.log(id);
    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        return c.json(post);
    } catch (err) {
        c.status(403);
        console.error(err);
        return c.json({ error: "Error while finding post" });
    }
});

blog.route("/", blogRouter);

export default blog;
