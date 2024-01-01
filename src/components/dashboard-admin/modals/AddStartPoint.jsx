"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLearnerStartPoint } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";

export default function AddStartingPoint({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const addEdit = useLearnerStartPoint((state) => state.addEdit);
  const afterAdd = useLearnerStartPoint((state) => state.afterAdd);
  const afterUpdate = useLearnerStartPoint((state) => state.afterUpdate);
  const [title, setTitle] = useState(useForEdit ? rowData.title : "");
  const [subtitle, setSubtitle] = useState(useForEdit ? rowData.subtitle : "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length < 3) {
      setError("Too Short");
    } else {
      const result = await addEdit({
        useForEdit,
        data: {
          title: title,
          subtitle: subtitle,
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
          {useForEdit ? "Update" : "New"} Learner Start Point
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Start Point Title</label>
            <CustomInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ph="Enter Title"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label>Start Point Subtitle</label>
            <CustomInput
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              ph="Enter Subtitle"
            />
            {/* <span className="text-red-700">{error}</span> */}
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
