import type { Metadata } from "next";
import SigninForm from "./Form";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Login'
}
export default function Login() {
    return (
        <>
            <div className="flex flex-col p-4 lg:w-1/3">
                <div className="text-center">
                    <h1 className="font-bold text-3xl">Login your account</h1>
                    <p className="text-gray-500">Enter your credentials to get started</p>
                </div>
                <div className="mt-6">
                    <SigninForm />
                </div>
                <div className="mt-6 text-center text-sm">
                    Didn't have an account?{' '}
                    <Link className="underline" href="/signup">
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
}