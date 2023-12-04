import AdminFormTitle from '@/components/adminDashboard/share/AdminFormTitle';
import AdminResetPasswordForm from '@/components/adminDashboard/AdminResetPasswordPage/AdminResetPasswordForm';
import React from 'react';

const AdminResetPassword = () => {
    return (
        <>
            <AdminFormTitle title={'ResetPassword'}/>
            <AdminResetPasswordForm/>
        </>
    );
};

export default AdminResetPassword;