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
import { useLearnerLevel } from "../../../store/useAdminStore";
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
 const [learnerLevel, setLearnerLevel] = useState(useForEdit ? rowData.level : "");
 const [error, setError] = useState("");

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
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Learner Level
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Learning Level</label>
            <CustomInput
              type="text"
              value={learnerLevel}
              onChange={(e) => setLearnerLevel(e.target.value)}
              ph="Enter learner level"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800"
          />
        </form>
      </DialogHeader>
    </>
  );
}
