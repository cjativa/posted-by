import { ReactNode } from "react";

interface IHeadingProps {
    children: ReactNode,
};

export const Heading = ({ children }: IHeadingProps) => {
    return (
        <h1 className="text-4xl font-bold leading-normal mt-0 mb-2">
            {children}
        </h1>
    );
};