import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface BlogType {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            setBlogs(res.data);
            setLoading(false);
        })
    },[])
    return {
        loading,
        blogs
    }
}