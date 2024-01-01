'use client'
import Link from "next/link";
import { Form } from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

import InputField from "../ui-custom/InputField";
import CustomButton from "../ui-custom/CustomButton";
import { handleSubmit } from "@/lib/handleSubmit";
import { useAuthStore } from "@/store/userStore";


const formSchema = (identifierError, passwordError) => {
    return z.object({
        identifier: z.string().min(2, {
            message: identifierError,
        }),
        password: z.string().min(2, {
            message: passwordError,
        }),
    })
}

const LoginForm = () => {
    const router = useRouter()
    const userLoginCall = useAuthStore((state) => state.login)
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema("Fill up the identifier field", "Fill up the password field")),
        defaultValues: {
            identifier: "",
            password: ""
        },
    })

    // submit
    const onSubmit = async (values) => {
        try {
            const response = await userLoginCall(values)
            handleSubmit(response, toast, 'User Login', router, 'userdashboard')
        } catch (error) {
            toast({
                title: `login failed`
            })
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <InputField form={form} name={'identifier'} placeholder={"Email or UserName"} type={'text'} style={'user-input'} />
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} style={'user-input'} />
                <div className="flex justify-end items-center">
                    <Link href={'/forget-password'} className=" cursor-pointer text-xl ">Forget Password</Link>
                </div>
                <CustomButton
                    txt={'Sign In'}
                    type="submit"
                    style="user-btn"
                />
            </form>
        </Form>
    );
};

export default LoginForm;