import React from 'react';
import Link from 'next/link';
import NotificationAvatar from '@/components/share/NotificationAvatar/NotificationAvatar';
import UserAvatar from '@/components/share/UserAvatar/UserAvatar';

const UserNavbar = () => {
    return (
        <div className='bg-white py-5 border-b-2 border-[--bgSecondary]'>
            <div className='w-[90%] mx-auto flex justify-between items-center'>
                <div>
                    <h1 className='text-4xl font-bold py-1 text-[--cardPrimary]'>Nakhlah</h1>
                </div>
                <div className='space-x-6 md:text-2xl text-xl hov pt-1 md:block hidden'>
                    <Link href={'/userdashboard'}>Home</Link>
                    <Link href={'/userdashboard/learn'}>Learn</Link>
                    <Link href={'/userdashboard/practice'}>Practice</Link>
                    <Link href={'/userdashboard/leaderboards'}>LeaderBoards</Link>
                    <Link href={'/userdashboard/target'}>Target</Link>
                    <Link href={'/userdashboard/myplan'}>MyPlan</Link>
                </div>
                <div className='flex gap-3 items-center'>
                    <NotificationAvatar isAdmin={false} />
                    <UserAvatar/>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;