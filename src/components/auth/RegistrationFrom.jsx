'use client'
import { Form } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation';
import { useAuthStore, useUserStore } from '@/store/userStore';
import { toast } from "@/components/ui/use-toast";
import InputField from '../ui-custom/InputField';
import CustomButton from '../ui-custom/CustomButton';
import { handleSubmit } from '@/lib/handleSubmit';


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill up the email field",
    }),
    username: z.string().min(2, {
        message: "Fill up the username field",
    }),
    password: z.string().min(2, {
        message: "Fill up the password field",
    }),
})

const RegistrationFrom = () => {
    const router = useRouter()
    const userRegisterCall = useAuthStore((state) => state.register)
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    })
    // submit
    const onSubmit = async (values) => {
        try {
            const response = await userRegisterCall(values)

            handleSubmit(response, toast, 'User Registration ', router, 'login')
        } catch (error) {
            toast({
                title: `Register failed`
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <InputField form={form} name={'email'} placeholder={"Email"} type={'email'} style={'user-input'} />
                <InputField form={form} name={'username'} placeholder={"User Name"} type={'text'} style={'user-input'} />
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} style={'user-input'} />
                <CustomButton
                    txt={'Sign Up'}
                    type="submit"
                    style="user-btn"
                />
            </form>
        </Form>
    );
};

export default RegistrationFrom;