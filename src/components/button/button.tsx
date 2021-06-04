
interface IButtonProps {
    children: React.ReactNode,
    style: 'primary' | 'secondary',
    onClick?: () => void,
    className?: string,
};

export const Button = ({ children, onClick, style, className }: IButtonProps) => {

    let fullClass = 'px-6 py-4 rounded-xl font-bold w-max';

    if (className && className.length > 0) {
        fullClass += ` ${className} `;
    }

    if (style === 'primary') {
        fullClass += ' bg-gradient-to-r from-blue-500 to-green-400 text-white ';
    }

    if (style === 'secondary') {
        fullClass += ' border-2 border-solid border-blue-500 ';
    }

    return (
        <button
            onClick={onClick}
            className={fullClass}
        >
            {children}
        </button>
    );
};