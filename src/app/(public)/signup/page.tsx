import Link from "next/link";
import SignupForm from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup"
}

export default function SignUp() {
    return (
        <>
            <div className="flex flex-col p-4 lg:w-1/3">
                <div className="text-center">
                    <h1 className="font-bold text-3xl">Create an account</h1>
                    <p className="text-gray-500">Enter your information to get started</p>
                </div>
                <div className="mt-6">
                    <SignupForm />
                </div>
                <div className="mt-6 text-center text-sm">
                    Already have an account?{' '}
                    <Link className="underline" href="/login">
                        Login
                    </Link>
                </div>
            </div>
        </>

    );
}