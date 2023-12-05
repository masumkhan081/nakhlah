'use client'
import { Form } from '@/components/ui/form';
import InputField from '../share/InputField';
import AdminFormButton from './share/AdminFormButton/AdminFormButton';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    password: z.string().min(2, {
        message: "Fill up the password field",
    }),
})
const AdminResetPasswordForm = () => {
    // 1. Define your form.
    const form = useForm ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })
    
    // submit
    const onSubmit =(values) =>{
        
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} isAdmin={true}/>
                
                <AdminFormButton title={'Reset Password'}/>
            </form>
        </Form>
    );
};

export default AdminResetPasswordForm;