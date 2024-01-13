"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useLearnerStartPoint,
  useTabularView,
} from "../../../../store/useAdminStore";
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

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
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
          <div className="flex flex-col ">
            <label>Start Point Title</label>
            <CustomInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ph="Enter Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex flex-col ">
            <label>Start Point Subtitle</label>
            <CustomInput
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              ph="Enter Subtitle"
              style="py-0.25 px-1"
            />
            {/* <span className="text-red-700">{error}</span> */}
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
