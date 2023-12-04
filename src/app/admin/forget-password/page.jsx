import AdminFormTitle from '@/components/adminDashboard/share/AdminFormTitle';
import AdminForgetPasswordForm from '@/components/adminDashboard/adminForgetPasswordPage/AdminForgetPasswordForm';

const AdminForgetPassword = () => {
    return (
        <>
            <AdminFormTitle title={'Forget Password'}/>
            <AdminForgetPasswordForm/>
        </>
    );
};

export default AdminForgetPassword;