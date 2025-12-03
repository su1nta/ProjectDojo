import React from "react";
import IconRight from "@/app/assets/icon-chevron-right.svg";
import Image from "next/image";
import CourseCard from "./course-card";

type Props = {
    title: string;
    childType: string;
    children: React.ReactNode;
};

const CourseCatalogue = ({ title, childType, children }: Props) => {
    return (
        <div className="w-full flex flex-col px-5 gap-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-geist font-semibold text-3xl text-shadow-md text-black/60 shadow-black/80">
                        {title}
                    </h2>
                </div>
                <div>
                    <button className="px-4 py-2 flex items-center justify-center border border-secondary bg-linear-to-t from-secondary to-accent hover:from-accent transition duration-200 cursor-pointer">
                        See More
                        <Image src={IconRight} alt="Icon Right" />
                    </button>
                </div>
            </div>
            <div
                className={`grid ${
                    childType === "CourseCard" ? "grid-cols-3" : "grid-cols-5"
                } gap-5`}
            >
                {children}
            </div>
        </div>
    );
};

export default CourseCatalogue;
