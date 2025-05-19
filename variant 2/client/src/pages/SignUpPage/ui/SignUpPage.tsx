import { SignUpForm } from "@/features";
import { useLayoutEffect } from "react";

export function SignUpPage(): React.JSX.Element {

    useLayoutEffect(() => {
        document.title = "React App: Sign Up Page";
    }, []);

    return (
        <div>
            <SignUpForm />
        </div>
    )
}