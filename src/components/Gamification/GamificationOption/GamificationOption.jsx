'use client'
import { CheckCircle2, XCircle } from 'lucide-react';
import React from 'react';

const GamificationOption = ({handleItem, isSentence, item, element, isChecked, isRight }) => {
    return (
        <div className='relative'>
            {
                isSentence ? 
                <p onClick={()=>handleItem(item)} className={`normalText cursor-pointer ${element === item ?'buttonClick text-black':'buttonSecondary text-white'} py-2 rounded-xl text-center `}>{item}</p> 
                : 
                <div  onClick={()=>handleItem(item)} className='w-40'>
                    <p className={`normalText py-2 cursor-pointer  text-center rounded-lg ${element === item ?'buttonClick text-black':'buttonSecondary text-white'} `}>{item}</p>
                </div>
            }
            {
               element === item && isChecked && <div className='absolute top-1 right-1'>
                    {isRight ? <CheckCircle2 color='green' /> : <XCircle color='red' />}
                </div>
            }
        </div>
    );
};

export default GamificationOption;