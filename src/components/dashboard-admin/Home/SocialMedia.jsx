"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { AiOutlineLike } from "react-icons/ai";

const data =[
    {
        id: 1,
        title: 'New post reached 7k+ likes',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 2,
        title: 'New post reached 7k+ likes',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 3,
        title: 'New post reached 7k+ likes',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 4,
        title: 'New post reached 7k+ likes',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 5,
        title: 'New post reached 7k+ likes',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
]
function SocialMedia() {
    return (
        <Card className='w-[30%] textPrimaryColor bg-white border-none rounded-xl'>
            <CardHeader>
                <CardTitle className='textSemiHeader font-bold'>Social Media</CardTitle>
            </CardHeader>
            <CardDescription className='w-[90%] mx-auto flex flex-col gap-5'>
                {data.map(item=>(
                    <div key={item.id} className='flex gap-3'>
                        <div className='text-3xl w-12 h-12 bg-black/40 flex items-center justify-center text-white rounded'>{item.icon}</div>
                        <div>
                            <p className='text-xl'>{item.title}</p>
                            <p className='text-[16px]'>{item.subTitle}</p>
                        </div>
                    </div>
                ))}
            </CardDescription>
        </Card>
    )
}

export default SocialMedia