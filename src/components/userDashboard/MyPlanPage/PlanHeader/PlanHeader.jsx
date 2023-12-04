import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';

const PlanHeader = ({data}) => {
    return (
        <Card className='smallText border-none shadow-none bg-transparent'>
            <CardHeader className='flex flex-row gap-3 items-center  p-0'>
                <FiArrowLeftCircle className='text-[--shadowPrimary] normalText' />
                <CardTitle className='font-bold pt-[2px] '>{data.title}</CardTitle>
            </CardHeader>
            <CardContent className='pl-8 mt-3 pr-0 pb-0 pt-0'>
                <p>{data.description}</p>
            </CardContent>
        </Card>
    );
};

export default PlanHeader;