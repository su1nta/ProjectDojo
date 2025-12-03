import React from "react";

type Props = {};

const CategoryCard = (props: Props) => {
    return (
        <div className="col-span-1 flex items-center justify-center p-1 bg-linear-to-b from-background/40 to-background border border-outline/5 hover:shadow-sm cursor-pointer transition duration-200">
            <div className="w-full h-full px-4 py-3 flex items-center justify-center bg-linear-to-b from-accent to-secondary text-outline/80">
                <span>GenAI</span>
            </div>
        </div>
    );
};

export default CategoryCard;
