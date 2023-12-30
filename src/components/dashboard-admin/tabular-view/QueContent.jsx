'use client'
import DataTable  from '../table/DataTable'; 
import ColQueContent  from '../table/ColQueContent';

const QueContent = () => {
  
    return (
        <div className='w-full bg-white  rounded-xl'>
             <DataTable data={ ""} columns={ ColQueContent} view={"question-content"}  />
        </div>
    );
};

export default QueContent;