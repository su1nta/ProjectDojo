import React from "react";
import Image from "next/image";
import FooterImage from "@/app/assets/dojo-footer.png";
import IconGithub from "@/app/assets/icon-github.svg";

type Props = {};

function Footer({}: Props) {
    return (
        <div className="relative w-screen h-100 overflow-hidden flex items-end">
            <Image
                src={FooterImage}
                alt="FooterImage"
                fill
                className="object-cover opacity-20 mask-t-from-20%"
            />
            <div className="absolute inset-0 bottom-0 flex flex-col items-center">
                <div className="h-1/5 flex items-center justify-between w-full max-w-6xl">
                    <span className="text-xl text-outline/50 font-jockey bg-sky-300">
                        made with ♥ by su1nta
                    </span>
                    <span className="flex gap-1 items-center justify-center w-30 p-1 bg-linear-to-t from-secondary to-accent border border-accent/20 hover:shadow-sm transition duration-200 cursor-pointer rounded-md">
                        <Image
                            src={IconGithub}
                            alt="GitHub"
                            className=" size-10"
                        />
                        <h6 className="text-md text-left text-primary font-jockey tracking-tight leading-4">
                            give a star if you like it
                        </h6>
                    </span>
                </div>
                <div className="h-4/5 flex items-end justify-center">
                    <h2 className="text-[16rem] font-jockey text-outline/70 leading-none opacity-20">
                        ProjectDojo
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Footer;
