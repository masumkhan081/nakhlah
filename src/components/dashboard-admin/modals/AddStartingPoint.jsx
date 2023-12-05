"use client";
import InputField from "@/components/share/InputField";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LearningStartingPointAddItem_URL } from "@/components/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AdminFormButton from "../AdminFormButton/AdminFormButton";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useLearningState } from "@/store/useAdminStore";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Fill the Title  field",
  }),
  subtitle: z.string().min(2, {
    message: "Fill the Subtitle  field",
  }),
  picture: z.any().refine((file) => file, "Please upload file"),
});

export default function AddStartingPoint({ rowData, title, useForEdit }) {
  const addItemAPICall = useLearningState((state) => state.addItem);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: useForEdit ? rowData.title : "",
      subtitle: useForEdit ? rowData.subtitle : "",
      picture: useForEdit ? rowData.formats : undefined,
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("files.icon", values.picture);
    formData.append(
      "data",
      `{"title":"${values.title}", "subtitle": "${values.subtitle}"}`
    );

    try {
      const response = await addItemAPICall(
        formData,
        LearningStartingPointAddItem_URL
      );
      if (response.status === 200) {
        toast({
          title: `${useForEdit ? "Update" : "Add"} ${title}  Item Successfully`,
        });
        document.getElementById("closeDialog")?.click();
      } else {
        toast({
          title: "Item not add",
        });
      }
    } catch (error) {
      toast({
        title: "Bad request",
      });
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Learning {title}
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              form={form}
              name={"title"}
              label={`title type`}
              placeholder={""}
              type={"text"}
              isAdmin={true}
              isItem={true}
            />
            <InputField
              form={form}
              name={"subtitle"}
              label={`Subtitle type`}
              placeholder={""}
              type={"text"}
              isAdmin={true}
              isItem={true}
            />
            <FormField
              control={form.control}
              name="picture"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="textPrimaryColor textNormal">
                    Upload File
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="py-2 px-4 border-[2px] border-[--uDSubText] textNormal textSecondaryColor"
                      {...rest}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        onChange(file);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <AdminFormButton title={`${useForEdit ? "Update" : "Add"} Item`} />
          </form>
        </Form>
      </DialogHeader>
    </>
  );
}
