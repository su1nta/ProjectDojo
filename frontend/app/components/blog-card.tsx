import React from "react";
import IconLike from "@/app/assets/icon-thumbs-up.svg";
import IconComment from "@/app/assets/icon-comment.svg";
import Image from "next/image";

type Props = {};

const BlogCard = (props: Props) => {
    return (
        <div className="flex border border-primary/10 gap-3 shadow-sm shadow-primary/10 bg-zinc-50 min-h-35">
            <div className="w-1/5 flex gap-2 p-2 cursor-pointer">
                <div className="h-full w-full bg-accent"></div>
            </div>
            <div className="w-4/5 flex flex-col py-2">
                <h3 className="text-2xl text-outline">Build a RAG in 3hours</h3>
                <h6 className="text-md text-outline/60">
                    by sukanta bala •︎ 3hrs ago
                </h6>
                <div className="mt-10 flex gap-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image src={IconLike} alt="Like" className="size-4" />
                        <span className="font-jockey text-outline text-xl">
                            7
                        </span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image
                            src={IconComment}
                            alt="Like"
                            className="size-4"
                        />
                        <span className="font-jockey text-xl text-outline">
                            2
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
