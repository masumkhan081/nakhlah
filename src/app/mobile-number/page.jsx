import FormHeader from '@/components/share/FormHeader';
import MobileNumberForm from '@/components/MobileNumberPage/MobileNumberForm';

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