import Link from 'next/link'

interface ISideMenuProps {
    links: {
        label: string,
        href: string,
    }[],
};

export const SideMenu = ({ links }: ISideMenuProps) => {

    return (
        <div className="w-1/5 p-8 shadow-lg flex flex-col justify-center sticky h-screen top-0 bg-white">
            <ul>
                {links.map((link) => (
                    <li>
                        <Link href={link.href}>
                            <a className="flex justify-center py-4 bg-red-100 my-4 cursor-pointer">
                                {link.label}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};