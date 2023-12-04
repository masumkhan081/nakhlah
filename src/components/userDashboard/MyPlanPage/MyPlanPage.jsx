'use client'
import React, { useState } from 'react';
import Plan from './Plan/Plan';
import { Card, CardHeader } from '@/components/ui/card';
import TitleSection from './TitleSection/TitleSection';
import ChoosePlan from './ChoosePlan/ChoosePlan';
import MyPlanButton from './MyPlanButton/MyPlanButton';
import PlanHeader from './PlanHeader/PlanHeader';
import { PaymentSelection } from './PaymentSelection/PaymentSelection';
import AddNewCard from './AddNewCard/AddNewCard';
import Image from 'next/image';

const MyPlanPage = ({ data }) => {
    const [id, setId] = useState(0);
    const handleContinue = (idx) =>{
        console.log(id)
        if(id !== 5){
            setId( id + 1)
        }
    }
    return (
        <div className='sm:bg-[--bgSecondary] py-5 '>
            <div className='md:w-[90%] w-[95%] mx-auto mb-5'>
                {
                    data[id].header.title != null &&
                    <PlanHeader data={data[id].header} />
                }
            </div>
            <Card className='bg-white py-10 sm:w-[90%] w-[95%] mx-auto rounded-xl'>
                <div className="md:w-[93%] w-[85%] mx-auto ">
                    {/* plan first page */}
                    {id == 0 ?
                        <Plan data={data[id]} /> :
                        // plan premium option choose section
                        id == 1 ?
                            <div className=''>
                                <Plan data={data[id]} />
                                <div className='mt-10'>
                                    <TitleSection data={data} isSummaryPage={false} />
                                </div>
                                {/* choose your plan */}
                                <div className='flex justify-between  mt-10'>
                                    <ChoosePlan title={'Monthly plan'} price={'5'} month={''} />
                                    <ChoosePlan title={'Monthly plan'} price={'50'} month={'12'} />
                                </div>
                            </div> :
                            // payment option choose section
                            id == 2 ?
                                <div className='relative 2xl:h-[70vh] lg:h-[70vh] md:h-[60vh] h-[70vh] '>
                                    {/* payment section choose */}
                                    <PaymentSelection data={data[id]} handleContinue={handleContinue}/>
                                    {/* add new card */}
                                    <div className='absolute  w-full' >
                                        <div className='w-[50%] md:w-[40%] lg:w-[30%]  2xl:w-[25%] mx-auto mt-10'>
                                            <AddNewCard />
                                        </div>

                                    </div>
                                </div> :
                                // review page section
                                id == 3 ?
                                    <>
                                        <Plan data={data[id]} isSummaryPage={true} />
                                    </> :
                                    id == 4 ?
                                        <div className='lg:w-[60%] md:w-[70%] sm:w-[80%] w-full mx-auto h-[50vh]  mt-10 mb-16'>
                                            <div className='flex justify-center mb-5'>
                                                <Image src={data[id].img} alt='' width={130} height={130}
                                                />
                                            </div>
                                            <div className='md:w-[75%] w-[90%] mx-auto text-center'>
                                                <h1 className='headerText font-bold'>{data[id].title}</h1>
                                                <h3 className='normalText'>{data[id].subTitle}</h3>
                                            </div>
                                        </div> : <>
                                            <Plan data={data[id]} />
                                            <div className='flex justify-between  my-20 mx-5'>
                                                {
                                                    data[id].dateList.map(item => (
                                                        <Card key={item.id} className='normalText  bg-[--bgSecondary] sm:w-[40%] w-[45%] flex justify-center font-bold'>
                                                            <CardHeader > 
                                                                <h1>{item.title}</h1>
                                                                <h1>{item.date}</h1>
                                                            </CardHeader>
                                                        </Card >
                                                    ))
                                                }

                                            </div>
                                        </>
                    }
                    {/* continue button */}
                    {id !== 2 && <MyPlanButton handleContinue={()=>handleContinue(id)} title={id === 5? 'Cancel': 'Continue'} />}
                </div>
            </Card >
        </div >
    );
};

export default MyPlanPage;