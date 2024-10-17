import { MenuIcon } from '@/components/ui/icons';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Metadata } from "next/types";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Dashboard",
        default: "Dashboard"
    },
    description: 'The Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

const links = [
    { href: '#', title: 'Home' },
    { href: '#', title: 'About' },
    { href: '#', title: 'Services' },
    { href: '#', title: 'Contact' },
]

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div>
                    <div className="border-b border-gray-100">
                        <div className="container mx-auto flex max-w-xl items-center justify-end p-4 md:justify-between md:px-6">
                            <nav className="hidden items-center space-x-4 text-sm md:flex">
                                {
                                    links.map(link => (
                                        <Link
                                            className="text-gray-900"
                                            href={link.href}
                                        >
                                            {link.title}
                                        </Link>
                                    ))
                                }
                            </nav>
                            <div className="hidden items-center space-x-4 md:flex">
                                <Link
                                    className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-black hover:text-white"
                                    href="/login">
                                    Login
                                </Link>
                                <button className="inline-flex rounded-md md:hidden" type="button">
                                    <MenuIcon className="h-6 w-6" />
                                    <span className="sr-only">Toggle Menu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <main className="container mx-auto mt-36 flex max-w-7xl justify-center">
                        {children}
                    </main>
                </div>
            </body>
        </html>

    );
}
