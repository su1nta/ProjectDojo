import React from "react";
import IconLike from "@/app/assets/icon-thumbs-up.svg";
import IconComment from "@/app/assets/icon-comment.svg";
import Image from "next/image";

type Props = {};

const BlogCard = (props: Props) => {
    return (
        <div className="flex flex-col gap-4 border border-primary/10 shadow-sm shadow-primary/10 bg-zinc-50 min-h-35 sm:flex-row sm:items-stretch">
            <div className="w-full flex gap-2 p-2 cursor-pointer sm:w-1/5">
                <div className="h-32 w-full bg-accent sm:h-full"></div>
            </div>
            <div className="w-full flex flex-col gap-2 px-4 pb-4 sm:w-4/5 sm:py-2">
                <h3 className="text-xl sm:text-2xl text-outline">
                    Build a RAG in 3hours
                </h3>
                <h6 className="text-sm sm:text-base text-outline/60">
                    by sukanta bala •︎ 3hrs ago
                </h6>
                <div className="mt-6 flex gap-6">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image src={IconLike} alt="Like" className="size-4" />
                        <span className="font-jockey text-outline text-lg sm:text-xl">
                            7
                        </span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image
                            src={IconComment}
                            alt="Like"
                            className="size-4"
                        />
                        <span className="font-jockey text-outline text-lg sm:text-xl">
                            2
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
