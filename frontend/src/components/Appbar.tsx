import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export const Appbar = () => {
    return <div>
        <div className="flex justify-between px-10 mb-4 mt-2">
            <div className="text-4xl"> Blogg </div>
            <div className="flex justify-between items-end">
                <div className="">
                    <Link to={'/publish'}><Button className="mx-10 rounded-full bg-green-500 text-gray-600 hover:bg-gray-800 hover:text-white">Create New Blog</Button></Link>
                </div>
                <div className="h-10 w-10 flex flex-col justify-center">
                    <Avatar name="Kumar Aman" size={10} />
                </div>
            </div>
        </div>
        <Separator className="bg-slate-200"/>
    </div>
}

