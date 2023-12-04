'use client'
import { Form } from '@/components/ui/form';
import React from 'react';
import InputField from '../share/InputField';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import UserFromButton from '../share/UserFromButton/UserFromButton';
import axios from 'axios';
import { Forget_Reset_URL } from '@/components/url';
import { useRouter, useSearchParams } from 'next/navigation';



const formSchema = z.object({

    password: z.string().min(2, {
        message: "Fill the password",
    }),
    passwordConfirmation: z.string().min(2, {
        message: "Fill the password",
    }),
})


const ResetPasswordForm = () => {
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
        if(values.password !== values.passwordConfirmation){
            console.log('passwords are not same')
            return
        }
        try {
            const response = await axios.post(`${Forget_Reset_URL}/reset-password`, {
                code, ...values
            });
            if (response.status === 200) {
                console.log('reset Password successful')
                router.push('/login')

            } else {
                console.log('email send fail. Status:', response.status, 'Response:', response.data);
            }

        } catch (error) {
            console.error('Error found', error.message)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField form={form} name={'password'} placeholder={"New Password"} type={'password'} isAdmin={false} />
            <InputField form={form} name={'passwordConfirmation'} placeholder={"Confirm Password"} type={'password'} isAdmin={false} />

            <UserFromButton title={'Confirm'} />
            </form>
        </Form>
    );
};

export default ResetPasswordForm;