'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form } from '@/components/ui/form';
import React from 'react';

import { DialogClose } from "@/components/ui/dialog";
import InputField from "@/components/ui-custom/InputField";
import CustomButton from "@/components/ui-custom/CustomButton";
import { Button } from "@/components/ui/button";



const formSchema = z.object({
    cardName: z.string().min(2, {
        message: "Enter your card name",
    }),
    cardNumber: z.string().min(2, {
        message: "Enter your card number",
    }),
    expDate: z.string().min(2, {
        message: "Enter your card expire date",
    }),
    cvv: z.string().min(2, {
        message: "Enter your card cvv",
    }),
})

const PaymentInput = ({ handleSubmit }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardName: "",
            cardNumber: "",
            expDate: "",
            cvv: "",
        },
    })
    function onSubmit(values) {
        handleSubmit(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <InputField form={form} name={'cardName'} placeholder={"Card Name"} type={'text'} label={'Card Name'} style={'user-input'} />
                <InputField form={form} name={'cardNumber'} placeholder={"Card Number"} type={'text'} label={'Card Number'} style={'user-input'} />
                <div className="flex gap-5">
                    <InputField form={form} name={'expDate'} placeholder={"EXP date"} type={'text'} label={'EXP Date'} style={'user-input'} />
                    <InputField form={form} name={'cvv'} placeholder={"CVV"} type={'text'} isAdmin={false} payment={true} label={'CVV'} style={'user-input'} />
                </div>
                <Button type={'submit'} className='user-btn'>Add Card</Button>
            </form>
        </Form>
    );
};

export default PaymentInput;