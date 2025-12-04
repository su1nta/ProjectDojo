import React from "react";
import IconRight from "@/app/assets/icon-chevron-right.svg";
import Image from "next/image";
import CourseCard from "./course-card";
import IconBookmark from "@/app/assets/icon-bookmark.svg";
import IconSort from "@/app/assets/icon-sort.svg";
import IconFilter from "@/app/assets/icon-funnel.svg";
import IconSearch from "@/app/assets/icon-search.svg";

type Props = {
    children: React.ReactNode;
};

const UserCounseCatalogue = ({ children }: Props) => {
    return (
        <div className="w-full flex flex-col px-5 gap-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-geist font-semibold text-3xl text-shadow-md text-black/60 shadow-black/80">
                        Your Dojo
                    </h2>
                </div>
                <div className="relative flex items-center w-1/3 h-7">
                    <Image
                        src={IconSearch}
                        alt="Search"
                        className="absolute left-2 w-4 h-4 opacity-50"
                    />
                    <input
                        type="text"
                        className="outline-none focus:ring-1 focus:ring-secondary transition duration-300 border border-outline/5 w-full h-full pl-8 pr-3 bg-zinc-100 shadow-sm focus:shadow-md placeholder:text-outline/30 placeholder:font-jockey placeholder:text-lg"
                        placeholder="search"
                    />
                </div>
                <div className="flex items-end justify-center gap-x-3">
                    <span className="p-px bg-accent border border-outline/10 cursor-pointer">
                        <Image src={IconBookmark} alt="Bookmark" />
                    </span>
                    <span className="p-px bg-accent border border-outline/10 cursor-pointer">
                        <Image src={IconSort} alt="Bookmark" />
                    </span>
                    <span className="p-px bg-accent border border-outline/10 cursor-pointer">
                        <Image src={IconFilter} alt="Bookmark" />
                    </span>
                </div>
            </div>
            <div className={`grid grid-cols-3 gap-5`}>{children}</div>
        </div>
    );
};

export default UserCounseCatalogue;
