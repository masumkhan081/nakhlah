// 'use client'
// import { useEffect, useState } from 'react';
// import { getStartQuestion } from '../data';
// import Image from 'next/image';
// import { AiFillCheckCircle } from 'react-icons/ai';
// import GetPageItem from './GetPageItem/GetPageItem';



// const GetStartPage = () => {
//     const [clicked, setClicked] = useState(false)
//     const [index, setIndex] = useState(-1)
//     const [currentId, setCurrentId] = useState(3)
//     const { question, imgs, options } = getStartQuestion[currentId]
//     const handleClicked = (id) => {
//         setIndex(id)
//         setClicked(true)
//     }

    
//     return (
//         <div className='sm:py-10 py-0  sm:h-[80vh] h-[100vh]  flex justify-center items-center'>
//             <div className=''>
//                 <h1 className='2xl:text-4xl text-3xl   text-center pt-1 xl:mb-16 mb-10'>{question}</h1>
//                 <div className='flex lg:flex-nowrap flex-wrap  justify-center  gap-5 '>
//                     {
//                         imgs.flatMap((item, idx) => (
//                             <GetPageItem key={idx} idx={idx} item={item} index={index} clicked={clicked} handleClicked={handleClicked} options={options} currentId={currentId}/> 
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GetStartPage;


