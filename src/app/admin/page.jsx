import AdminDashboardPage from '@/components/adminDashboard/AdminDashboardPage/AdminDashboardPage';
import AdminSignInForm from '@/components/adminDashboard/AdminSignInPage/AdminSignInForm';
import AdminFormTitle from '@/components/adminDashboard/share/AdminFormTitle';
import Link from 'next/link';

import React from 'react'

const Admin = () => {
    return (
        <>
            <AdminFormTitle title={'Login'}/>
            <AdminSignInForm/>
            <div className='flex justify-center mt-3'>
                <Link href={'/admin/forget-password'} className='hover:text-[--uDHoverText] text-xl'>Forget Password</Link>
            </div>
        </>
    );
};

export default Admin;