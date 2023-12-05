'use client'
import InputField from "@/components/share/InputField";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form} from "@/components/ui/form";
import { LearningGoalAddItem_URL } from "@/components/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AdminFormButton from "../AdminFormButton/AdminFormButton";
import { useToast } from "@/components/ui/use-toast";
import { useLearningState } from "@/store/useAdminStore";


const formSchemaGoal = z.object({
    title: z.string().min(2, {
        message: "Fill the Goal  field",
    }),
    time: z
        .string()
        .min(0, "Amount must be a positive number")
})


export default function AddGoal({rowData, title, useForEdit}) {
    const addItemAPICall = useLearningState((state) => state.addItem)
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchemaGoal),
        defaultValues: {
            title: useForEdit? rowData.goal : '',
            time: useForEdit? rowData.time : undefined
        }
    })

    const onSubmit = async (values) => {
        let data = {
            "data": {
                "time": values.time,
                "goal": values.title
            }
        }
        try {
            const response = await  addItemAPICall(data, LearningGoalAddItem_URL)
            if (response.status === 200) {
                toast({
                    title: `${useForEdit?'Update': 'Add'} ${title}  Item Successfully`
                })
                document.getElementById('closeDialog')?.click();
            }
            else {
                toast({
                    title: 'Item not add'
                })
            }
        } catch (error) {
            toast({
                title: 'Bad request'
            })
        }
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle className="textHeader textPrimaryColor">
                    {useForEdit ? "Update" : "New"} Learning {title}
                </DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                        <InputField form={form} name={'title'} label={`${title} type`} placeholder={""} type={'text'} isAdmin={true} isItem={true} />
                        <InputField form={form} name={'time'} label={`Time`} placeholder={""} type={'number'} isAdmin={true} isItem={true} />

                        <AdminFormButton title={`${useForEdit? 'Update': 'Add'} Item`} />
                    </form>
                </Form>
            </DialogHeader>
        </>
    )
}