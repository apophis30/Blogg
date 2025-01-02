import { Quote } from "@/components/Quote"
import { SignUpComponent } from "@/components/signupcomponent"

export const Signup = () => {
    return (<div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignUpComponent />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
    )
}