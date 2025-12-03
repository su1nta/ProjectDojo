import React from "react";
import IconUser from "@/app/assets/icon-user.svg";
import Image from "next/image";
type Props = {};

const CourseCard = (props: Props) => {
    return (
        <>
            <div className="col-span-1 grid grid-rows-6 h-80 bg-linear-to-b from-background/40 to-background border border-outline/5 backdrop-blur-sm gap-1 cursor-pointer hover:shadow-sm transition duration-200">
                <div className="row-span-2 w-full px-3 flex flex-col justify-center gap-1 mt-4">
                    <div>
                        <h4 className="text-xl font-semibold">
                            Build a RAG using Langchain
                        </h4>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-secondary rounded-sm p-1">
                            <Image
                                src={IconUser}
                                alt="User Icon"
                                width={12}
                                height={12}
                            />
                        </div>
                        <span className="text-md font-geist-mono text-black/50">
                            CampusX
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2 overflow-x-scroll w-3/4 max-w-3/4">
                            <span className="px-2 py-1 text-xs border border-secondary/40 text-black/40">
                                Badge
                            </span>
                            <span className="px-2 py-1 text-xs border border-secondary/40 text-black/40">
                                Badge
                            </span>
                            <span className="px-2 py-1 text-xs border border-secondary/40 text-black/40">
                                Badge
                            </span>
                        </div>
                        <div className="text-2xl text-black/70 font-jockey w-1/4 max-w-1/4 flex items-center justify-center">
                            ₹ 2,999
                        </div>
                    </div>
                </div>
                <div className="row-span-4 w-full px-3 flex items-center">
                    <div className="w-full h-6/7 bg-secondary"></div>
                </div>
            </div>
        </>
    );
};

export default CourseCard;
