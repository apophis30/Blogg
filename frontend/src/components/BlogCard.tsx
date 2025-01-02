import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return(
        <Link to={`/blog/${id}`}>
            <div className="p-4 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex">
                    <Avatar name={authorName} size={7}/> 
                    <div className="ml-2 font-extralight mr-2 flex flex-col justify-center">{authorName}</div>
                    <div className="flex flex-col justify-center">
                        <Circle />
                    </div>
                    <div className="ml-2 font-thin text-slate-400 flex flex-col justify-center">{publishedDate}</div>
                </div>
                <div className="text-3xl font-semibold">
                    {title}
                </div>
                <div className="text-lg font-thin">
                    {content.slice(0,100)+(content.length >= 100 ? "...": "")}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-3">
                    {`${Math.ceil(content.length/100)} minute(s) read`}
                </div>
                <Separator className="bg-slate-200 mt-3"/>
            </div>
        </Link>
    )
}

export function Avatar({name, size}: {name: string, size: number}){
    let firstName = name.split(" ")[0]
    let secondName = name.split(" ")[1]
    let finalAvatar = ""
    if(secondName==null || secondName=="" || secondName==" "){
        finalAvatar=firstName[0]
    }else{
        finalAvatar=firstName[0]+secondName[0]
    }
    return(
        <div className={`inline-flex items-center justify-center w-${size} h-${size} text-sm text-white bg-gray-600 rounded-full`}>
            {finalAvatar}
        </div>
    )
}

function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-400">

        </div>
    )
}