'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import MyPlanButton from "../MyPlanButton/MyPlanButton"
import Image from "next/image"

const FormSchema = (data) => {
    return z.object({
        type: z.enum(data, {
            required_error: "You need to select a notification type.",
        }),
    })
}


export function PaymentSelection({ data, handleContinue }) {
    const form = useForm({
        resolver: zodResolver(FormSchema(data.pay)),
    })

    function onSubmit(value) {
        handleContinue()
    }

    return (
        <Form {...form} className={'h-full'}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 ">
                <FormField
                    control={form.control}
                    className=''
                    name="type"
                    render={({ field }) => (
                        <FormItem className=" 2xl:w-[30%] xl:w-[35%] md:w-[50%] w-[80%] mx-auto">

                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="w-full space-y-6"
                                >
                                    <OptionList data={data} />
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="absolute bottom-0 w-full">
                    <MyPlanButton title={'Continue'} />
                </div>
            </form>
        </Form>
    )
}


function OptionList({ data }) {
    const { listOfOption, pay } = data
    return (
        <>
            {
                listOfOption.map((item, idx) => (

                    <FormItem key={item.id} className="flex  md:px-4 px-3 md:py-5 py-4 justify-between  w-full border-[--inputBorderPrimary] bg-[--bgSecondary] border-2 rounded-md">
                        <FormLabel className=" flex gap-2 ">
                            {
                                item.img.map((item, idx) => (
                                    <Image key={idx} src={item} alt="" width={50} height={15} />
                                ))
                            }
                        </FormLabel>
                        <FormControl>
                            <RadioGroupItem value={pay[idx]} className='' />
                        </FormControl>
                    </FormItem>

                ))
            }
        </>
    )
}