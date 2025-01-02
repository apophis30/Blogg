import { FullBlog } from "@/components/FullBlog"
import { useBlog } from "@/hooks/useBlog"
import { BlogType } from "@/hooks/useBlogs"
import { useParams } from "react-router-dom"

export const Blog = () => {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id as string
    })
    if(loading){
        return <div>
            loading...
        </div>
    }
    return (
        <div>
            <FullBlog blog={blog as BlogType}/>
        </div>
    )
}