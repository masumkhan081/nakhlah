import FormHeader from '@/components/share/FormHeader';
import ForgetPasswordForm from '@/components/ForgetPasswordPage/ForgetPasswordForm';
import React from 'react';

const ForgetPassword = () => {
    return (
        <>
            <FormHeader subtitle={'Forgot Password'} />
            <div className=' h-full 2xl:py-16  py-10'>
                <ForgetPasswordForm />
            </div>

        </>
    );
};

export default ForgetPassword;