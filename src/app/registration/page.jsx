import RegistrationFrom from "@/components/auth/RegistrationFrom";
import FormHeader from "@/components/dashboard-admin/navbar/FormHeader";
import OrSection from "@/components/ui-custom/OrSection";
import ThirdPartyLogin from "@/components/ui-custom/ThirdPartyLogin";


const Registration = () => {
    return (
        <>
            <FormHeader subtitle={'Registration'} />
            <div className='py-5'>
                <RegistrationFrom />
                <OrSection />
                <ThirdPartyLogin />
            </div>
        </>
    );
};

export default Registration;