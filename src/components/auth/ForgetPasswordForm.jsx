'use client'
import { Form } from '@/components/ui/form';
import React from 'react';
import InputField from '../share/InputField';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import UserFromButton from '../share/UserFromButton/UserFromButton';
import axios from 'axios';
import { Forget_Reset_URL } from '../../../lib/url';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill the email",
    }),

})

const ForgetPasswordForm = () => {
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
            const response = await axios.post(`${Forget_Reset_URL}/forgot-password`, {
                ...values
            });
            if (response.status === 200) {
                const userData = response.data;
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

                <InputField form={form} name={'email'} placeholder={"Email"} type={'email'} isAdmin={false} />
                <UserFromButton title={'Confirm'} />
            </form>
        </Form>
    );
};

export default ForgetPasswordForm;