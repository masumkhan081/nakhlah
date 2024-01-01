'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import InputField from '../ui-custom/InputField';
import CustomButton from '../ui-custom/CustomButton';

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
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} style={'admin-input'} level={'Password'} levelStyle={'text-[16px]'} />
                <CustomButton
                    txt={'Reset Password'}
                    type="submit"
                    style="admin-btn"
                />
            </form>
        </Form>
    );
};

export default AdminResetPasswordForm;