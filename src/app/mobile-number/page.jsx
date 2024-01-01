import MobileNumberForm from "@/components/auth/MobileNumberForm";
import FormHeader from "@/components/dashboard-admin/navbar/FormHeader";


const MobileNumber = () => {
    return (
        <div className='  '>
            <FormHeader subtitle={'Mobile Number'} />
            <div className=' h-full 2xl:py-16  py-10'>
                <MobileNumberForm />
            </div>
        </div>
    );
};

export default MobileNumber;