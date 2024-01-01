'use client'
import { Form } from '@/components/ui/form';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation';
import CustomButton from '../ui-custom/CustomButton';
import InputField from '../ui-custom/InputField';
import { toast } from "@/components/ui/use-toast";
import { handleSubmit } from '@/lib/handleSubmit';
import { useAuthStore } from '@/store/userStore';


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill the email",
    }),

})

const ForgetPasswordForm = () => {
    const userForgetCall = useAuthStore((state)=> state.forget)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    // submit
    const onSubmit = async (values) => {
        try {
            const response = await userForgetCall(values)
            handleSubmit(response, toast, 'Email Send', router, '')
 
         } catch (error) {
             // console.error('Email Send', error.message)
             toast({
                 title: `Email send failed`
             })
         }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <InputField form={form} name={'email'} placeholder={"Email"} type={'email'} style={'user-input'} />
                <CustomButton
                    txt={'Confirm'}
                    type="submit"
                    style="user-btn"
                />
            </form>
        </Form>
    );
};

export default ForgetPasswordForm;