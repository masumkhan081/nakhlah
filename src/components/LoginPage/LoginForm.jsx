'use client'
import Link from "next/link";
import { Form } from "../ui/form";
import InputField from "../share/InputField";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import UserFromButton from "../share/UserFromButton/UserFromButton";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";
import { handleSubmit } from "../share/handleSubmit";


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
    const userLoginCall = useUserStore((state)=> state.userLogin)
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
        const response = await userLoginCall(values)
        handleSubmit(response ,toast,'User Login',router,'userdashboard')
        
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <InputField form={form} name={'identifier'} placeholder={"Email or UserName"} type={'text'} isAdmin={false} />
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} isAdmin={false} />
                <div className="flex justify-end items-center">
                    <Link href={'/forget_password'} className=" cursor-pointer text-xl ">Forget Password</Link>
                </div>
                <UserFromButton title={'Sign In'} />
            </form>
        </Form>
    );
};

export default LoginForm;