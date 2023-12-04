import Link from 'next/link';


const ViewAll = ({title, link}) => {
    return (
        <div className='flex justify-between items-center'>
            <h1 className='semiHeaderText font-bold'>{title}</h1>
            <Link href={link} className='smallText py-1'>View All</Link>
        </div>
    );
};

export default ViewAll;