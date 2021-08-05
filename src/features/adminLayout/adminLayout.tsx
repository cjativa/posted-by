import React from 'react';

import { NavigationBar } from '../../components/navigationBar/navigationBar';
import { SideMenu } from '../../components/sideMenu/sideMenu';

const ADMIN_LAYOUT_LINKS = [
    {
        label: 'Home',
        href: 'home'
    },
    {
        label: 'Threads',
        href: 'threads'
    },
];

interface IUserLayoutProps {
    children: React.ReactNode,
};

export const AdminLayout = ({ children }: IUserLayoutProps) => {


    return (
        <div className="flex flex-row relative">
            <SideMenu links={ADMIN_LAYOUT_LINKS} />

            <div className="flex flex-col justify-start items-center w-full h-100">
                <NavigationBar />
                <div className="w-full h-full grid grid-cols-12 bg-blue-50 py-8 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};