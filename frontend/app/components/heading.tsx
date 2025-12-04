import React from "react";

type Props = {
    subtitle?: String;
    title: String;
};

const Heading = (props: Props) => {
    return (
        <div className="w-full flex flex-col items-start justify-start px-5 mt-10">
            <h5 className="w-full font-jockey text-xl leading-tight tracking-widest text-black/45">
                {props.subtitle}
            </h5>
            <h1 className="w-full font-jockey text-5xl tracking-tight text-black/50">
                {props.title}
            </h1>
        </div>
    );
};

export default Heading;
