import React from 'react';
import { MdStars } from 'react-icons/md';

const UserPoint = ({point}) => {
    return (
        <div className='pt-2'>
            <p className='semiHeaderText font-bold flex gap-1 '><MdStars className='text-[#00A948]' /> {point}</p>
        </div>
    );
};

export default UserPoint;