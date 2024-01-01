import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import FormHeader from "@/components/dashboard-admin/navbar/FormHeader";


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