import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlogType } from "./useBlogs";

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            setBlog(res.data);
            setLoading(false);
        })
    },[id])
    return {
        loading,
        blog
    }
}