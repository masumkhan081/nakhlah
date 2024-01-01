import { Card, CardHeader } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';


const ChoosePlan = ({onClick, isClick,title,cost,month}) => {
    
    
    return (
        <Card onClick={onClick} className={`normalText  bg-[--bgSecondary] ${isClick ? 'border-gradient-to-b from-[#8dff4b] to-[#17740e]': ''}  sm:w-[40%] w-[45%] flex justify-center font-bold`}>
            <CardHeader>
                <h1>{title}</h1>
                <h1><span className='semiHeaderText'>${cost}</span>/ {month} Month</h1>
            </CardHeader>
        </Card>
    );
};

export default ChoosePlan;