'use client'
import { CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const GamificationOptionImage = ({ handleItem, item, element, check, isRight, isChecked }) => {


    return (
        <div onClick={() => handleItem(check)} className={`border-2 cursor-pointer relative ${ element === check ? isChecked? isRight ? 'border-green-900 bg-green-400/30':'border-red-900 bg-red-400/40':'border-gradient-to-b from-[#f3f3f3] to-[#888888]' : 'border-[#4c2a41]'} rounded-lg`}>
            <Image src={item} alt={check} width={130} height={100} className='' />
            {
               element === check && isChecked && <div className='absolute top-1 right-1'>
                    {isRight ? <CheckCircle2 color='green' /> : <XCircle color='red' />}
                </div>
            }
        </div>
    );
};

export default GamificationOptionImage;