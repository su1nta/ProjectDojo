import Link from "next/link";
import React from "react";

type Props = {};

const Nav = (props: Props) => {
    return (
        <div className="h-20 w-full max-w-6xl border-x border-b border-accent/50 flex items-center justify-between">
            <div className="p-3 font-jockey text-3xl">
                <Link href="/explore">ProjectDojo</Link>
            </div>
            <div className="p-3 flex gap-5">
                <Link
                    href="explore"
                    className="px-3 py-2 hover:bg-accent transition duration-200"
                >
                    Explore
                </Link>
                <Link
                    href="courses"
                    className="px-3 py-2 hover:bg-accent transition duration-200"
                >
                    Courses
                </Link>
                <Link
                    href="blog"
                    className="px-3 py-2 hover:bg-accent transition duration-200"
                >
                    Blog
                </Link>
            </div>
            <div className="p-3 flex gap-2">
                <Link
                    href=""
                    className="py-2 px-6 bg-accent hover:bg-accent/80 transition duration-200"
                >
                    Sign Up
                </Link>
                <Link
                    href=""
                    className="py-2 px-6 bg-secondary hover:bg-secondary/80 transition duration-200"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default Nav;
