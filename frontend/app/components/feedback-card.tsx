import React from "react";
import IconSendRight from "@/app/assets/icon-send-horizontal.svg";
import IconMail from "@/app/assets/icon-mail.svg";
import IconTwitter from "@/app/assets/icon-twitter.svg";
import IconInstagram from "@/app/assets/icon-instagram.svg";
import Image from "next/image";

type Props = {};

const FeedbackCard = (props: Props) => {
    return (
        <div className=" w-full bg-zinc-100/20 h-160 flex items-center justify-center">
            <div className="h-3/5 w-3/5 border border-secondary">
                <div className="h-1/4 bg-accent/50 flex items-center justify-center">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl xl:text-7xl font-jockey text-secondary/60">
                        provide your feedback
                    </h2>
                </div>
                <div className="h-3/4">
                    <div className="h-3/5 flex items-center justify-center">
                        <div className="w-4/5 h-10 flex items-center justify-center">
                            <input
                                type="text"
                                className="w-100 h-10 border border-primary focus:ring-1 focus:ring-secondary outline-none px-3 caret-primary placeholder:text-primary"
                                placeholder="this dojo is enlightening"
                            />
                            <div className="w-40 h-10 bg-primary flex items-center justify-center gap-2 cursor-pointer">
                                <h5 className="text-md md:text-3xl font-jockey text-accent">
                                    Send
                                </h5>
                                <Image
                                    src={IconSendRight}
                                    height={25}
                                    width={25}
                                    alt="SendIcon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="h-2/5 gap-5 flex items-center justify-center">
                        <Image
                            src={IconMail}
                            alt="Mail"
                            height={45}
                            width={45}
                            className="bg-secondary p-2 cursor-pointer"
                        />
                        <Image
                            src={IconTwitter}
                            alt="Twitter"
                            height={45}
                            width={45}
                            className="bg-secondary p-2 cursor-pointer"
                        />
                        <Image
                            src={IconInstagram}
                            alt="Instagram"
                            height={45}
                            width={45}
                            className="bg-secondary p-2 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;
