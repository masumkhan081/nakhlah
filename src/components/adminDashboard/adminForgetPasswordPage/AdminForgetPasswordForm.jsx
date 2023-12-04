'use client'
import { Form } from '@/components/ui/form';
import InputField from '../../share/InputField';
import AdminFromButton from '../share/AdminFormButton/AdminFormButton';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill up the email field",
    }),
})

const AdminForgetPasswordForm = () => {
    // 1. Define your form.
    const form = useForm ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    
    // submit
    const onSubmit =(values) =>{
        
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <InputField form={form} name={'email'} placeholder={"Email Address"} type={'email'} isAdmin={true}/>
                
                <AdminFromButton title={'Send'}/>
            </form>
        </Form>
    );
};

export default AdminForgetPasswordForm;