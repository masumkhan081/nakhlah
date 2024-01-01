'use client'
import { getStartQuestion } from '@/static-data/data';
import { useState } from 'react';
import GetPageItem from './GetPageItem/GetPageItem';
import CustomButton from '../ui-custom/CustomButton';
import { useRouter } from 'next/navigation';




const GetStartPage = () => {
    const route = useRouter()
    const [clicked, setClicked] = useState(false)
    const [index, setIndex] = useState(-1)
    const [currentId, setCurrentId] = useState(0)
    const { question, imgs, options } = getStartQuestion[currentId]
    const handleClicked = (id) => {
        setIndex(id)
        setClicked(true)
    }

    const handleContinue = (id)=>{
        if(id === 3){
            route.push('/userdashboard')
            return
        }
        if(clicked){
            setCurrentId(currentId + 1)
            setIndex(-1)
            setClicked(false)
        }
    }

    return (
        <div className='sm:pt-10 relative  pt-16  sm:h-[80vh] h-[100vh] '>
            <div className=''>
                <h1 className='2xl:text-4xl text-3xl   text-center pt-1 xl:mb-16 mb-10'>{question}</h1>
                <div className='flex lg:flex-nowrap flex-wrap  justify-center  gap-5 '>
                    {
                        imgs.flatMap((item, idx) => (
                            <GetPageItem key={idx} idx={idx} item={item} index={index} clicked={clicked} handleClicked={handleClicked} options={options} currentId={currentId} />
                        ))
                    }
                </div>

            </div>
            <div className=' absolute sm:bottom-16 bottom-5 sm:w-[30%] w-[40%] m-auto left-0 right-0'>
                <CustomButton
                    click={()=>handleContinue(currentId)}
                    txt={'Continue'}
                    style={'user-btn'}
                />
            </div>
        </div>
    );
};

export default GetStartPage;


