import FormHeader from '@/components/share/FormHeader';
import LoginForm from '@/components/LoginPage/LoginForm';
import OrSection from '@/components/share/OrSection';
import ThirdPartyLogin from '@/components/share/ThirdPartyLogin';
import React from 'react';

const Login = () => {
    return (
        <>
            <FormHeader subtitle={'login'}/>
            <LoginForm />
            <OrSection />
            <ThirdPartyLogin />
        </>
    );
};

export default Login;