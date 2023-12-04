import { Dates } from '@/components/ImageLocation';
import { Progress } from '@/components/ui/progress';
import { TimerReset } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const GamificationHeader = () => {

    return (
        <div className='2xl:pt-10 pt-5 sm:w-full w-[90%] mx-auto flex gap-3'>
            <div className='w-full '>
                <Progress
                    className='h-5 -z-50'
                    // You can set the theme to the desired color
                    style={{ backgroundColor: 'var(--uDBg)' }}
                    indentorColor={`progressSecondary`} // Change the background color here
                    value="50" // Set the progress value
                />
                <p className='text-[18px] text-white text-center w-[50%] -mt-5 z-50'>4</p>
            </div>
            <p className='text-[18px]'>4</p>
            <div className='flex gap-1'>
                <Image src={Dates} alt='date' className='h-6 w-5'/>
                <p className='text-[18px]'>15</p>
            </div>
            <div className='sm:flex hidden gap-1'>
                <TimerReset size={20} color='#dd800f'/>
                <p className='text-[18px]'>2:03</p>
            </div>
        </div>
    );
};

export default GamificationHeader;