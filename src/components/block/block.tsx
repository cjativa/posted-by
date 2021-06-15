interface IBlockProps {
    children: React.ReactNode,
    className?: string,
};

export const Block = ({ children, className }: IBlockProps) => {

    return (
        <div className={`rounded overflow-hidden shadow-lg p-16 ${className} bg-white`}>
            {children}
        </div>
    );
};