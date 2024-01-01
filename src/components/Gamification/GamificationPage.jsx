'use client'
import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { CheckCircle2, Volume2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { gamificationData } from '@/static-data/data';
import GamificationHeader from './GamificationHeader/GamificationHeader';
import GamificationOption from './GamificationOption/GamificationOption';
import GamificationOptionImage from './GamificationOptionImage/GamificationOptionImage';


const GamificationPage = () => {
    const [qNo, setQNo] = useState(0)
    const data = gamificationData[qNo]
    const [isRight, setIsRight] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [element, setElement] = useState('')


    // choose ans click
    const handleItem = (item) => {
        console.log(item)
        setIsClicked(true)
        setElement(item)
    }
    // skip question
    const handleSkip = () => {
        if (qNo <= 2) (
            setQNo(qNo + 1)
        )
        else {
            setQNo(0)
        }
        setElement('')
        setIsClicked(false)
        setIsRight(false)
        setIsChecked(false)
    }
    // check ans is right or not
    const handleCheck = () => {
        setIsChecked(true)
        if (data.ans[1] === element) {
            setIsRight(true)
        }
        else {
            setIsRight(false)
        }
    }
    return (
        <div className='h-[100vh] relative'>
            <div className='2xl:w-[50%] xl:w-[70%] md:w-[80%] sm:w-[90%] w-[95%]  mx-auto'>
                <GamificationHeader />
                <Card className='border-0 shadow-none 2xl:mt-8 sm:mt-5 mt-8'>
                    <CardHeader className='px-0'>
                        <CardTitle className='normalText font-normal text-center'>{data.questions}</CardTitle>
                    </CardHeader>
                    {data.givenType === 'sentence' ?
                        <CardContent className='sm:w-[70%] w-[95%] mx-auto flex sm:gap-16 gap-5' >
                            <div>
                                <Image src={data.givenImg} alt={data.given} width={150} height={100} />
                            </div>
                            <div className=' w-[50%] flex items-center '>
                                <div className='w-full'>
                                    <div className='flex gap-3 border-[#F79001] border-[2px] rounded-lg px-5 py-1 items-center w-full'>
                                        <Volume2 color='#F79001' />
                                        <span className='normalText pt-[1px]'>{data.given}</span>
                                    </div>
                                    <div className='flex flex-col gap-4 mt-10'>
                                        {
                                            data.option.map((item, idx) => (
                                                <GamificationOption handleItem={handleItem} key={idx} isSentence={true} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        : data.givenType === 'word' && data.optionType === 'img' ?
                            <CardContent className='sm:w-[75%] w-[95%] mx-auto '>
                                {/* first section images */}
                                <div className='flex justify-between '>
                                    {
                                        data.option.slice(0, 2).map((item, idx) => (
                                            <GamificationOptionImage handleItem={handleItem} key={idx} item={item} element={element} check={data.optionName[idx]} isRight={isRight} isChecked={isChecked} />
                                        ))
                                    }
                                </div>
                                {/* given option */}
                                <div className='w-[200px] mx-auto my-5 bg-[--bgSecondary] border-[#F79001] border-[2px] rounded-lg'>
                                    <p className='normalText py-2  text-center'>{data.given}</p>
                                </div>
                                {/* second section images */}
                                <div className='flex justify-between '>
                                    {
                                        data.option.slice(2,).map((item, idx) => (
                                            <GamificationOptionImage handleItem={handleItem} key={idx} check={data.optionName[idx + 2]} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                        ))
                                    }
                                </div>
                            </CardContent>
                            : data.givenType === 'img' && data.optionType === 'word' ?
                                <CardContent className='sm:w-[70%] w-[95%] mx-auto'>
                                    {/* first section  */}
                                    <div className='flex justify-between '>
                                        {
                                            data.option.slice(0, 2).map((item, idx) => (
                                                <GamificationOption handleItem={handleItem} key={idx} isSentence={false} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                            ))
                                        }
                                    </div>
                                    {/* given option */}
                                    <div className='border-2 border-[#4c2a41] rounded-lg w-[130px] mx-auto my-14'>
                                        <Image src={data.givenImg} alt={data.given} width={130} height={100} className='' />
                                    </div>
                                    {/* second section */}
                                    <div className='flex justify-between '>
                                        {
                                            data.option.slice(2, 4).map((item, idx) => (
                                                <GamificationOption handleItem={handleItem} key={idx} isSentence={false} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                            ))
                                        }
                                    </div>
                                </CardContent>
                                : data.givenType === 'word' && data.optionType === 'word' &&
                                <CardContent className='sm:w-[70%] w-[95%] mx-auto'>
                                    {/* first section images */}
                                    <div className='flex justify-between '>
                                        {
                                            data.option.slice(0, 2).map((item, idx) => (
                                                <GamificationOption handleItem={handleItem} key={idx} isSentence={false} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                            ))
                                        }
                                    </div>
                                    {/* given option */}
                                    <div className='w-[200px] mx-auto my-20 bg-[--bgSecondary] border-[#F79001] border-[2px] rounded-lg'>
                                        <p className='normalText py-2  text-center'>{data.given}</p>
                                    </div>
                                    {/* second section images */}
                                    <div className='flex justify-between '>
                                        {
                                            data.option.slice(2, 4).map((item, idx) => (
                                                <GamificationOption handleItem={handleItem} key={idx} isSentence={false} item={item} element={element} isRight={isRight} isChecked={isChecked} />
                                            ))
                                        }
                                    </div>
                                </CardContent>
                    }
                </Card>
            </div>
            <div className={`${!isChecked && 'border-t-[1px]'} absolute bottom-0 w-full ${isChecked ? isRight ? 'right' : 'wrong' : 'bg-white'}`}>
                <div className='2xl:w-[50%] xl:w-[70%] md:w-[80%] w-[90%]  mx-auto 2xl:h-24 h-20'>
                    {isChecked ?
                        <div className={`flex items-center justify-between h-full`}>
                            <div className={`text-white normalText flex ${isRight && 'items-center'} gap-2`}>
                                {isRight ? <CheckCircle2 color='white' /> : <XCircle color='white' />}
                                {isRight ?
                                    <p className=''>Congratulation</p>
                                    :
                                    <div className='leading-5'>
                                        <p>Wrong Answer</p>
                                        <small className='sm:text-[14px] text-[12px]'>Answer is: {data.ans[1]}</small>
                                    </div>
                                }
                            </div>
                            <div className='w-[25%] '>
                                <Button onClick={handleSkip} className='user-btn'>Continue</Button>
                            </div>
                        </div>
                        :
                        <div className=' flex items-center justify-between h-full'>
                            <div className='sm:w-[20%] w-[30%]'>
                                <Button onClick={handleSkip} className='user-btn'>Skip</Button>
                            </div>
                            <div className='sm:w-[20%] w-[30%]'>
                                <Button disabled={!isClicked} onClick={handleCheck} className='user-btn'>Check</Button>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default GamificationPage;