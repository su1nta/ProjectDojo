"use client";
import Link from "next/link";
import React, { useState } from "react";
import IconMenu from "@/app/assets/icon-menu.svg";
import IconClose from "@/app/assets/icon-x.svg";
import Image from "next/image";

type Props = {};

const Nav = (props: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="relative h-20 w-full max-w-6xl border-x border-b border-accent/50 flex items-center justify-between">
            <div className="p-3 font-jockey text-3xl flex items-center gap-2">
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    className="md:hidden"
                >
                    <Image src={IconMenu} className="size-7" alt="Menu" />
                </button>
                <Link href="/explore">ProjectDojo</Link>
            </div>
            <div className="p-3 hidden md:flex gap-5">
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
            <div className="p-3 hidden md:flex gap-2">
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
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 w-full bg-linear-to-b from-background via-background/95 to-accent/80 backdrop-blur-md border-t border-outline/10 md:hidden">
                    <button
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        className="absolute left-4 top-4 rounded-full border border-outline/20 bg-background/80 p-2 text-outline/70 shadow-sm"
                    >
                        <Image
                            src={IconClose}
                            alt="Close menu"
                            className="size-5"
                        />
                    </button>
                    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6">
                        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-3xl font-jockey text-outline/80">
                            <Link
                                href="/explore"
                                onClick={closeMenu}
                                className="w-full rounded border border-outline/20 py-3 text-center hover:bg-accent/40"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/courses"
                                onClick={closeMenu}
                                className="w-full rounded border border-outline/20 py-3 text-center hover:bg-accent/40"
                            >
                                Courses
                            </Link>
                            <Link
                                href="/blog"
                                onClick={closeMenu}
                                className="w-full rounded border border-outline/20 py-3 text-center hover:bg-accent/40"
                            >
                                Blog
                            </Link>
                        </div>
                        <div className="flex w-full max-w-sm items-center justify-center gap-4">
                            <Link
                                href=""
                                onClick={closeMenu}
                                className="flex-1 rounded border border-outline/20 bg-accent py-3 text-center font-medium text-outline/80 hover:bg-accent/80"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href=""
                                onClick={closeMenu}
                                className="flex-1 rounded border border-outline/20 bg-secondary py-3 text-center font-medium text-outline/80 hover:bg-secondary/80"
                            >
                                Sign In
                            </Link>
                        </div>
                        <button
                            onClick={closeMenu}
                            className="text-sm uppercase tracking-widest text-outline/60"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
