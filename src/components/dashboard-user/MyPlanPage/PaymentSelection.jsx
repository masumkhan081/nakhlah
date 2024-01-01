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
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const FormSchema = (data) => {
    return z.object({
        type: z.enum(data, {
            required_error: "You need to select a notification type.",
        }),
    })
}

const data = [
    {
        id: 1,
        title: 'Default',
        dis: 'default'
    },
    {
        id: 2,
        title: 'Comfortable',
        dis: 'comfortable'
    },
    {
        id: 3,
        title: 'Compact',
        dis: 'compact'
    },
]
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
                                    className="w-full space-y-6 "
                                >
                                    <OptionList data={data} />
                                    {/* {
                                        data.map(item => (
                                            <div key={item.id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={item.dis} id={``} />
                                                <Label htmlFor={}>{item.title}</Label>
                                            </div>
                                        ))
                                    } */}

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="absolute bottom-0 w-full">
                    <div className="w-[50%] md:w-[40%] lg:w-[30%]  2xl:w-[25%] mx-auto">
                        <Button type={'submit'} className='user-btn'>Continue</Button>
                    </div>
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

                    <div key={item.id} className="flex  md:px-4 px-3 h-16 justify-between items-center  w-full border-[--inputBorderPrimary] bg-[--bgSecondary] border-2 rounded-md " >
                        <Label className=" flex gap-2 w-[calc(100%_-_1.25rem)] cursor-pointer" htmlFor={`r${idx}`}>
                            {
                                item.img.map((item, idx) => (
                                    <Image key={idx} src={item} alt="" className="w-10 h-6" />
                                ))
                            }
                        </Label>
                        <RadioGroupItem value={pay[idx]} id={`r${idx}`} className='w-5 h-5 cursor-pointer' />

                    </div>

                ))
            }
        </>
    )
}

{/* <FormLabel className=" flex gap-2 ">
                            {
                                item.img.map((item, idx) => (
                                    <Image key={idx} src={item} alt="" width={50} height={15} />
                                ))
                            }
                        </FormLabel>
                        <FormControl>
                            <RadioGroupItem value={pay[idx]} className='' />
                        </FormControl> */}