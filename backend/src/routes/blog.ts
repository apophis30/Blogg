import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { getPrisma } from "../services/database";

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
});

blogRouter.put("/", authMiddleware, async(c) => {
    const userId = c.get('userId')
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
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
});

blogRouter.get("/bulk", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const posts = await prisma.post.findMany()
    return c.json(posts);
});

blogRouter.get("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    console.log(id);
    const prisma = getPrisma(c.env.DATABASE_URL)
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    return c.json(post);
});

blog.route("/", blogRouter);

export default blog;
