interface IBlockProps {
    children: React.ReactNode,
    className?: string,
    paddingX?: 4 | 8 | 12 | 16,
    paddingY?: 4 | 8 | 12 | 16,
};

export const Block = ({ children, className, paddingX = 16, paddingY = 16 }: IBlockProps) => {

    return (
        <div className={`rounded overflow-hidden shadow-lg px-${paddingX} py-${paddingY} ${className} bg-white`}>
            {children}
        </div>
    );
};