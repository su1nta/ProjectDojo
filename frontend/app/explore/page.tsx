import React from "react";
import Heading from "../components/heading";
type Props = {};

export default function Explore({}: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <Heading
                subtitle="Explore our dojo collection"
                title={`Good Morning, Jimmy`}
            />
        </div>
    );
}
