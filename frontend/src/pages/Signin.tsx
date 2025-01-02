import { Auth } from "@/components/Auth"
import { Quote } from "@/components/Quote"
import { SignInComponent } from "@/components/signincomponent"

export const Signin = () => {
    return (<div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                {/* <Auth type="signin"/> */}
                <SignInComponent />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
    )
}