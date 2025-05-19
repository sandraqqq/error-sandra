import { SignInForm } from "@/features";
import { useLayoutEffect } from "react";

export function SignInPage(): React.JSX.Element {

    useLayoutEffect(() => {
        document.title = "React App: Sign In Page";
    }, []);

    return (
        <div>
            <SignInForm />
        </div>
    )
}