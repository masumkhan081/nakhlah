import AdminSignInForm from '@/components/dashboard-admin/AdminSignInForm';
import AdminFormTitle from '@/components/ui-custom/AdminFormTitle';
import Link from 'next/link';

import React from 'react'

const Admin = () => {
    return (
        <>
            <AdminFormTitle title={'Login'}/>
            <AdminSignInForm/>
            <div className='flex justify-center mt-3'>
                <Link href={'/admin/forget-password'} className='hover:text-[--uDHoverText] text-[16px]'>Forget Password</Link>
            </div>
        </>
    );
};

export default Admin;