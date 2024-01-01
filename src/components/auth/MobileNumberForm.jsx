'use client'
import React, { useState } from 'react';
import { Form, } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import UserFromButton from '../share/UserFromButton/UserFromButton';
import CustomButton from '../ui-custom/CustomButton';




const formSchema = z.object({
    countryCode: z.string({
        required_error: "Please select your country",
    }),
    number: z.string({
        required_error: "Please input your number",
    }),
})



const MobileNumberForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        
    })
    
    
    // submit
    const onSubmit = (values) => {

        console.log(values.countryCode, values.number)
        // resetInputField()
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* <SelectionField form={form} data={country} name={'countryCode'} subtitle={'select Country'} />
                <InputField form={form} name={'number'} placeholder={"Mobile Number"} type={'number'} isAdmin={false}/> */}
              
              <CustomButton
                    txt={'Send'}
                    type="submit"
                    style="user-btn"
                />
            </form>
        </Form>
    );
};

export default MobileNumberForm;