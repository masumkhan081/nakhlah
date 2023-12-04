import { Card, CardHeader } from '@/components/ui/card';
import React from 'react';

const ChoosePlan = ({title,price,month}) => {
    return (
        <Card className='normalText  bg-[--bgSecondary] sm:w-[40%] w-[45%] flex justify-center font-bold'>
            <CardHeader>
                <h1>{title}</h1>
                <h1><span className='semiHeaderText'>${price}</span>/ {month} Month</h1>
            </CardHeader>
        </Card>
    );
};

export default ChoosePlan;