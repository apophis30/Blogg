import { SignupType } from "@apophis30/common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    })
    const navigate = useNavigate()
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(err) {
            alert("Error while signing up")
            // alert the user here that the request failed
            // console.error("Error in SignUp of User", err);
            // console.log(err);
        }
    }

    return (<div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-bold">
                        { type==="signup"? "Create an Account": "Welcome to Blogg"}
                    </div>
                    <div className="flex justify-center text-slate-400">
                        { type==="signup" ? "Already have an account ?" : "Don't have an account" } 
                        <Link className="pl-2 underline" to={ type=="signup"? '/signin': '/signup'}> { type==="signup" ? "Login": "Sign Up"} </Link>
                    </div>
                </div>
                <div className="grid gap-5 mt-6 mb-6">
                    <LabledInput label="Email" placeholder="johndoe@email.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}/>
                    <LabledInput label="Password" type={"password"} placeholder="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}/>
                    { type==="signup"? <LabledInput aria-label="Optional name input" label="Name (Optional)" placeholder="John Doe " onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}/>: null}
                    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{ type === "signup" ? "Sign Up": "Sign In" }</button>
                </div>
            </div>
        </div>
    </div>)
}

interface LabledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type ?: string;
}

function LabledInput({label, placeholder, type, onChange}: LabledInputType) {
    return(<div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">{ label }</label>
            <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ placeholder } onChange={ onChange } required />
        </div>
    </div>)
}