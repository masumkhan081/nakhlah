import { CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

import React from 'react';

const TitleSection = ({ data, isSummaryPage }) => {
    return (
        <div className=''>
            <CardHeader className={`pt-0`}>
                {isSummaryPage ? <>
                    <Image src={data.img} alt='' width={100} height={100} className=' mx-auto' />
                    <CardTitle className='headerText  text-center'>
                        {data.title}
                        <span className='semiHeaderText'>{data.subTitle}</span>
                    </CardTitle></>
                    :
                    <CardTitle className='semiHeaderText  text-center'>{data.title}</CardTitle>}
            </CardHeader>
            <Separator className='py-[2px]' />
        </div>
    );
};

export default TitleSection;