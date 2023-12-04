import { Button } from '@/components/ui/button';
import React from 'react';

const MyPlanButton = ({title, handleContinue}) => {
    return (
        <div  className='w-[50%] md:w-[40%] lg:w-[30%]  2xl:w-[25%] mx-auto mt-10'>
            <Button onClick={handleContinue} type='submit' className='buttonColor '>{title}</Button>
        </div>
        
    );
};

export default MyPlanButton;