
import AdminResetPasswordForm from '@/components/dashboard-admin/auth/AdminResetPasswordForm';
import AdminFormTitle from '@/components/ui-custom/AdminFormTitle';
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