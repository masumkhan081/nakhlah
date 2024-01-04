"use client";
import InputField from "../../ui-custom/InputField";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LearningLevelAddItem_URL } from "../../../lib/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AdminFormButton from "../../ui-custom/AdminFormButton";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useLearnerLevel, useTabularView } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomButton from "@/components/ui-custom/CustomButton";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Fill the Title  field",
  }),
  picture: z.any().refine((file) => file, "Please upload file"),
});

export default function AddLearnerLevel({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  //
  const addEdit = useLearnerLevel((state) => state.addEdit);
  const afterAdd = useLearnerLevel((state) => state.afterAdd);
  const afterUpdate = useLearnerLevel((state) => state.afterUpdate);
  //
  const [learnerLevel, setLearnerLevel] = useState(
    useForEdit ? rowData.level : ""
  );
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (learnerLevel.length < 3) {
      setError("Too Short");
    } else {
      const result = await addEdit({
        useForEdit,
        data: {
          level: learnerLevel,
        },
        id: rowData?.id,
      });
      if (result.status == 200) {
        useForEdit ? afterUpdate(result.data) : afterAdd(result.data);
        toast({
          title: result.message,
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        setError(result.error);
      }
    }
  }
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col">
            <label>Learning Level</label>
            <CustomInput
              type="text"
              value={learnerLevel}
              onChange={(e) => setLearnerLevel(e.target.value)}
              ph="Enter learner level"
              style={"py-0.25 px-1"}
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex gap-2 items-center">
            <input type="file" onChange={onImageChange} className="" />
            {image && (
              <img
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
              />
            )}
          </div>
          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </DialogHeader>
    </>
  );
}
