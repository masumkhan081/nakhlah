import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import FormHeader from '@/components/dashboard-admin/navbar/FormHeader';
import React from 'react';

const ChangePassword = () => {
    return (
        <>
            <FormHeader subtitle={'Change Password'} />
            <div className=' h-full 2xl:py-16  py-10'>
                <ResetPasswordForm />
            </div>
            
        </>
    );
};

export default ChangePassword;