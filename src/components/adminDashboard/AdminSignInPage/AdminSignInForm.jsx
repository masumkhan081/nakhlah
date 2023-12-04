'use client'

import { Form } from '../../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import InputField from '../../share/InputField';
import AdminFormButton from '../share/AdminFormButton/AdminFormButton';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { useAdminAuth } from '@/store/useAdminStore';
import { handleSubmit } from '@/components/share/handleSubmit';

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill the email",
    }),
    password: z.string().min(2, {
        message: "Fill the password",
    }),
})
const AdminSignInForm = () => {
    const adminAuthCall = useAdminAuth((state) => state.adminAuth)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    // reset input field
    // const resetInputField = () => {
    //     form.resetField('email')
    //     form.resetField('password')
    // }
    // submit
    const onSubmit = async(values) => {
        const response = await adminAuthCall(values)
        handleSubmit(response ,toast,'Admin Login',router,'admin/dashboard')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <InputField form={form} name={'email'} placeholder={"Email Address"} type={'email'} isAdmin={true} />
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} isAdmin={true} />

                <AdminFormButton title={'Sign In'} />
            </form>
        </Form>
    );
};

export default AdminSignInForm;