"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminFormButton from "../share/AdminFormButton/AdminFormButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputField from "../../ui-custom/InputField";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Fill the Title  field",
  }),
  picture: z.any().refine((file) => file, "Please upload file"),
});
const formSchema2 = z.object({
  title: z.string().min(2, {
    message: "Fill the Title  field",
  }),
  subtitle: z.string().min(2, {
    message: "Fill the Subtitle  field",
  }),
  picture: z.any().refine((file) => file, "Please upload file"),
});
const formSchema3 = z.object({
  title: z.string().min(2, {
    message: "Fill the Goal  field",
  }),
  time: z.string().min(0, "Amount must be a positive number"),
});

const handleFormData = (title, values) => {
  const formData = new FormData();
  formData.append("files.icon", values.picture);
  if (title === "purpose") {
    formData.append("data", `{"purpose":"${values.title}"}`);
  } else if (title === "level") {
    formData.append("data", `{"level":"${values.title}"}`);
  } else {
    formData.append(
      "data",
      `{"title":"${values.title}", "subtitle": "${values.subtitle}"}`
    );
  }
  return formData;
};

// {title, addURL, addItemAPICall, errorMessageCall}
export default function AddContTypeCategory({ title, isJourney }) {
  // console.log(title)

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      title === "purpose" || title === "level"
        ? formSchema
        : title === "title"
        ? formSchema2
        : formSchema3
    ),
    defaultValues:
      title === "purpose" || title === "level"
        ? {
            title: "",
            picture: [],
          }
        : title === "title"
        ? {
            title: "",
            subtitle: "",
            picture: [],
          }
        : {
            title: "",
            time: undefined,
          },
  });

  const onSubmit = async (values) => {
    let data;
    if (title !== "goal") {
      data = handleFormData(title, values);
    }
    if (title === "goal") {
      data = {
        data: {
          time: values.time,
          goal: values.title,
        },
      };
    }
    // extra added
    toast({
      title: `Add Item Successfully`,
    });
    document.getElementById("closeDialog")?.click();
    // try {
    //     const response = await addItemAPICall(data, addURL)
    //     if (response.status === 200) {
    //         toast({
    //             title: `Add ${title}  Item Successfully`
    //         })
    //         document.getElementById('closeDialog')?.click();
    //     }
    //     else {
    //         toast({
    //             title: 'Item not add'
    //         })
    //     }
    // } catch (error) {
    //     toast({
    //         title: 'Bad request'
    //     })
    // }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          GetStart Form
        </DialogTitle>
        <DialogDescription className="textNormal textSecondaryColor">
          Input new {title} item
        </DialogDescription>

        <Form encType="multipart/form-data" {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* this form get start section  if you create new form for journey section create bool value is Journey or not  */}
            {isJourney ? (
              <></>
            ) : (
              <>
                <InputField
                  form={form}
                  name={"title"}
                  label={`${title} type`}
                  placeholder={""}
                  type={"text"}
                  isAdmin={true}
                  isItem={true}
                />
                <>
                  {title === "goal" && (
                    <InputField
                      form={form}
                      name={"time"}
                      label={`Time`}
                      placeholder={""}
                      type={"number"}
                      isAdmin={true}
                      isItem={true}
                    />
                  )}
                </>
                <>
                  {title === "title" && (
                    <InputField
                      form={form}
                      name={"subtitle"}
                      label={`Sub${title} type`}
                      placeholder={""}
                      type={"text"}
                      isAdmin={true}
                      isItem={true}
                    />
                  )}
                </>

                <>
                  {title !== "goal" && (
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
                  )}
                </>
              </>
            )}

            <AdminFormButton title={"Add Item"} />
          </form>
        </Form>
        {/* {errorMessageCall !== '' && <p className='text-red-600 text'>{errorMessageCall}</p>} */}
      </DialogHeader>
    </>
  );
}
