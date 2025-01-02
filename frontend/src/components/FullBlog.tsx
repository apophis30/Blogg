import { BlogType } from "@/hooks/useBlogs"
import { Appbar } from "./Appbar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: BlogType}) => {
    return(<div>
        <Appbar />
        <div className="grid grid-cols-12 px-10 pt-12 w-full">
            <div className="col-span-8 max-w-4xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {blog.title}
                </h1>
                <div className="text-slate-400 font-light mt-5">
                    Posted on 2nd Jan 2025
                </div>
                <div className="mt-5">
                    {blog.content}
                </div>
                <blockquote className="mt-6 border-l-2 pl-6 italic">
                    "After all," he said, "everyone enjoys a good joke, so it's only fair that
                    they should pay for the privilege."
                </blockquote>
            </div>
            <div className="col-span-4">
                <div className="flex justify-center mb-8">
                    <p className="text-xl text-muted-foreground">
                        About the Author
                    </p>
                </div>
                <Card className="grid grid-cols-1 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex justify-center">
                            <div className="h-7 w-7 flex flex-col justify-center">
                                <Avatar name={blog.author.name} size={7} />
                            </div>
                            <h3 className="h-7 flex flex-col justify-center ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                                {blog.author.name || "Anonymus"}
                            </h3>
                        </CardTitle>
                        <CardContent>
                            <p className="text-gray-500 leading-7 [&:not(:first-child)]:mt-6">
                                {blog.author.name} is a skilled Software Engineer with expertise in developing efficient, scalable applications. With a passion for problem-solving and continuous learning, he thrives in dynamic environments and is dedicated to delivering high-quality software solutions.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button className="text-gray-600" variant="outline">More About Author</Button>
                        </CardFooter>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </div>)
}