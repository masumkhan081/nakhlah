'use client'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PaymentInput from '../PaymentInput/PaymentInput';



const AddNewCard = () => {

    const handleSubmit =(values)=>{
        console.log(values)
    }
    
    return (
        <Dialog >
            <DialogTrigger asChild  >
                <Button type="submit" className='buttonColor'>Add new Card</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <PaymentInput handleSubmit={handleSubmit}/>

            </DialogContent>
        </Dialog>
    );
};

export default AddNewCard;