interface IBlockProps {
    children: React.ReactNode,
    className?: string,
};

export const Block = ({ children, className }: IBlockProps) => {

    return (
        <div className={`rounded overflow-hidden shadow-lg p-10 ${className}`}>
            {children}
        </div>
    );
};