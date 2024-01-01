'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import InputField from '../ui-custom/InputField';
import CustomButton from '../ui-custom/CustomButton';

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill up the email field",
    }),
})

const AdminForgetPasswordForm = () => {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // submit
    const onSubmit = (values) => {

        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <InputField form={form} name={'email'} placeholder={"Email Address"} type={'email'} style={'admin-input'} level={'Email'} levelStyle={'text-[16px]'} />
                <CustomButton
                    txt={'Sign In'}
                    type="submit"
                    style="admin-btn"
                />
            </form>
        </Form>
    );
};

export default AdminForgetPasswordForm;