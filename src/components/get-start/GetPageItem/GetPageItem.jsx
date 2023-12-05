import Image from 'next/image';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const GetPageItem = ({handleClicked,idx, item,index, clicked, currentId,options}) => {
    return (
        <div>
            <div onClick={() => handleClicked(idx)} key={idx} className={`relative cursor-pointer border-[3px] 2xl:border-[5px] ${index == idx && clicked ? 'border-[--cardPrimary] bg-[#00913e]/50' : 'bg-white border-[--buttonSecondary]'} 2xl:w-[250px] xl:w-[200px] w-[150px] 2xl:h-[250px]  xl:h-[200px] h-[150px]   rounded-2xl`}>

                <div className={`flex items-center justify-center h-full w-full`}>
                    <Image src={item} alt={options[idx]} className={`object-cover  ${index == idx && clicked && currentId == 3 ? 'transform duration-500 ease-out 2xl:h-[190px] xl:h-[150px] h-[105px] 2xl:w-[190px] xl:w-[150px] w-[105px] ' : 'transform duration-500 ease-out h-full w-full'} rounded-xl `} />
                </div>
                <AiFillCheckCircle className={`${index == idx && clicked ? 'block' : 'hidden'}  xl:text-2xl text-xl absolute top-1 right-1 text-[--cardPrimary]`} />
            </div>
            <h1 className='md:text-2xl text-xl md:mt-5 mt-3 text-center'>{options[idx]}</h1>
        </div>
    );
};

export default GetPageItem;