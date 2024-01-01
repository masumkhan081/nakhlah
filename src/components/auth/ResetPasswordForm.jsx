'use client'
import { Form } from '@/components/ui/form';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '../ui-custom/CustomButton';
import InputField from '../ui-custom/InputField';
import { handleSubmit } from '@/lib/handleSubmit';
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from '@/store/userStore';


const formSchema = z.object({

    password: z.string().min(2, {
        message: "Fill the password",
    }),
    passwordConfirmation: z.string().min(2, {
        message: "Fill the password",
    }),
})


const ResetPasswordForm = () => {
    const userResetCall = useAuthStore((state) => state.reset)
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: ""
        },
    })
    // submit
    const onSubmit = async (values) => {
        if (values.password !== values.passwordConfirmation) {
            console.log('passwords are not same')
            return
        }
        try {
            const response = await userResetCall(code, values)
            handleSubmit(response, toast, 'Reset Password', router, 'login')
        } catch (error) {
            // console.error('Error found', error.message)
            toast({
                title: `Password Reset failed`
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <InputField form={form} name={'password'} placeholder={"New Password"} type={'password'} style={'user-input'} />
                <InputField form={form} name={'passwordConfirmation'} placeholder={"Confirm Password"} type={'password'} style={'user-input'} />
                <CustomButton
                    txt={'Confirm'}
                    type="submit"
                    style="user-btn"
                />
            </form>
        </Form>
    );
};

export default ResetPasswordForm;