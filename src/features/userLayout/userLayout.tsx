import React from 'react';

import { NavigationBar } from '../../components/navigationBar/navigationBar';
import { SideMenu } from '../../components/sideMenu/sideMenu';

const USER_LAYOUT_LINKS = [
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

export const UserLayout = ({ children }: IUserLayoutProps) => {


    return (
        <div className="flex flex-row">
            <SideMenu links={USER_LAYOUT_LINKS} />

            <div className="flex flex-col justify-start items-center w-full h-100">
                <NavigationBar />
                <div className="w-full h-full grid grid-cols-12">
                    <div className="col-start-4 col-span-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};