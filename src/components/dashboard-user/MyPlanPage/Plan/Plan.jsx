import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import TitleSection from '../TitleSection/TitleSection';

const Plan = ({ data, isSummaryPage}) => {
    const {  lists, service } = data
    console.log(data.paymentList)
    return (
        <Card className=' border-none shadow-none'>
            <TitleSection data={data} isSummaryPage={isSummaryPage}/>
            <CardContent className='w-[80%] mx-auto  p-0 border-none'>
                <div className=' bg-[--bgSecondary] rounded-md my-10 border-4'>
                    {
                        lists.map((item, idx) => (
                            <div key={idx} className={`normalText md:px-10 px-5  py-3 ${idx !== lists.length - 1 && 'border-b-4'}  flex justify-between items-center`}>
                                <p className='pt-1 font-bold'>{item}</p>
                                <div className=''>
                                    {service ? <MdCheckCircle className='text-[--cardPrimary]'/> : <MdCancel className='text-red-600'/>}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {isSummaryPage &&
                    <div className='bg-[--bgSecondary] border-4 rounded-md '>
                        {
                            data.paymentList.map(item=>(
                                <div key={item.id} className={`normalText font-bold flex justify-between md:px-10 px-5 py-3 ${item.id == 3 && 'border-t-4'}`} >
                                    <div>
                                        <h1 className='pt-1'>{item.title}</h1>
                                    </div>
                                    <div>
                                        <h1 className='pt-1'>{item.value}</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </CardContent>
        </Card>
    );
};

export default Plan;