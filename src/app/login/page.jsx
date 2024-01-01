
import LoginForm from '@/components/auth/LoginForm';
import FormHeader from '@/components/dashboard-admin/navbar/FormHeader';
import OrSection from '@/components/ui-custom/OrSection';
import ThirdPartyLogin from '@/components/ui-custom/ThirdPartyLogin';
import React from 'react';

const Login = () => {
    return (
        <>
            <FormHeader subtitle={'login'}/>
            <LoginForm />
            <OrSection />
            <ThirdPartyLogin/>
        </>
    );
};

export default Login;