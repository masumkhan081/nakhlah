'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import React from 'react';
import InputField from "@/components/share/InputField";
import { DialogClose } from "@/components/ui/dialog";



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
                <InputField form={form} name={'cardName'} placeholder={"Card Name"} type={'text'} isAdmin={false} payment={true} label={'Card Name'} />
                <InputField form={form} name={'cardNumber'} placeholder={"Card Number"} type={'text'} isAdmin={false} payment={true} label={'Card Number'} />
                <div className="flex gap-5">
                    <InputField form={form} name={'expDate'} placeholder={"EXP date"} type={'text'} isAdmin={false} payment={true} label={'EXP Date'} />
                    <InputField form={form} name={'cvv'} placeholder={"CVV"} type={'text'} isAdmin={false} payment={true} label={'CVV'} />
                </div>
                <DialogClose asChild>
                    <Button type="submit" className='buttonColor '>Add Card</Button>
                </DialogClose>
            </form>
        </Form>
    );
};

export default PaymentInput;