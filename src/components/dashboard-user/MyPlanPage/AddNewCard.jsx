'use client'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PaymentInput from './PaymentInput';



const AddNewCard = () => {

    const handleSubmit =(values)=>{
        console.log(values)
    }
    
    return (
        <Dialog >
            <DialogTrigger asChild  >
                <Button type="submit" className='user-btn'>Add new Card</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] py-10">
                <PaymentInput handleSubmit={handleSubmit}/>

            </DialogContent>
        </Dialog>
    );
};

export default AddNewCard;