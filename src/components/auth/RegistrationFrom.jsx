'use client'
import InputField from '../share/InputField';
import { Form } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import UserFromButton from '../share/UserFromButton/UserFromButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../../lib/url';
import { handleSubmit } from '../share/handleSubmit';
import { useUserStore } from '@/store/userStore';
import { toast } from "@/components/ui/use-toast";


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
    const userRegisterCall = useUserStore((state)=> state.userRegister)
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
        const response =  await userRegisterCall(values)

        handleSubmit(response ,toast,'User Registration',router,'login')

        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                username,
                password,
            });

            console.log(response)
            
            if (response.status === 200) {
              // Registration successful
              const userData = response.data;
              console.log('Registration successful. User data:', userData);
              router.push('/login')
            } else {
              
              console.log('Registration failed. Status:', response.status, 'Response:', response.data);
            }
          } catch (error) {
            console.error('Registration error:', error.message);
          }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <InputField form={form} name={'email'} placeholder={"Email"} type={'email'} isAdmin={false} />
                <InputField form={form} name={'username'} placeholder={"User Name"} type={'text'} isAdmin={false} />
                <InputField form={form} name={'password'} placeholder={"Password"} type={'password'} isAdmin={false} />
                
                <UserFromButton title={'Sign Up'}/>
            </form>
        </Form>
    );
};

export default RegistrationFrom;