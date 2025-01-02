import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { SignupType } from "@apophis30/common";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";

export const SignUpComponent= () => {
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    })
    const { toast } = useToast();
    const navigate = useNavigate();
    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
            const token = "Bearer "+response.data.token
            console.log(token)
            localStorage.setItem("token", token)
            navigate('/blogs')
        } catch (err) {
            console.error("Error in SignUp of User", err);
            const axiosError = err as AxiosError
            let errorMessage =  axiosError.message || "Error in SignUp"
            console.log(errorMessage)
            toast({
                variant: "alertify",
                title: "Sign Up Failed",
                description: errorMessage,
                action: <ToastAction altText="Try Again">Try Again</ToastAction>,
            })
        }
    }

    return(<div className="h-screen flex flex-col justify-center">
        <div className="flex flex-row justify-center">
            <Card className="w-[500px]">
                <CardHeader className="grid grid-cols-1 justify-items-center">
                    <CardTitle className="text-4xl font-bold">Create an Account</CardTitle>
                    <CardDescription className="text-md flex justify-center text-slate-400">
                        Already have an account ?
                        <Link className="pl-2 underline hover:text-blue-500" to={'/signin'}>Login</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <Label htmlFor="Email" className="block mb-2 text-sm font-semibold text-gray-900">Email</Label>
                                <Input type="email" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl placeholder:text-gray-400" placeholder="johndoe@email.com" 
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value
                                    })
                                }}/>
                            </div>
                            <div>
                                <Label htmlFor="Password" className="block mb-2 text-sm font-semibold text-gray-900">Password</Label>
                                <Input type="password" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl placeholder:text-gray-400" placeholder="Password" 
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    })
                                }}/>
                            </div>
                            <div>
                                <Label htmlFor="Name" className="block mb-2 text-sm font-semibold text-gray-900">Name (Optional)</Label>
                                <Input type="text" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl placeholder:text-gray-400" placeholder="John Doe" 
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value
                                    })
                                }}/>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Button type="button" onClick={sendRequest} className="mt-6 w-full text-white bg-gray-800 rounded-xl hover:bg-gray-900 font-medium text-lg">Sign Up</Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    Oauth authentication will be available soon !
                </CardFooter>
            </Card>
        </div>
    </div>)
};