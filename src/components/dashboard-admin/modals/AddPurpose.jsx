"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLearnerPurpose } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomButton from "@/components/ui-custom/CustomButton";

export default function AddPurpose({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  //
  const addEdit = useLearnerPurpose((state) => state.addEdit);
  const afterAdd = useLearnerPurpose((state) => state.afterAdd);
  const afterUpdate = useLearnerPurpose((state) => state.afterUpdate);
  //
  const [purpose, setPurpose] = useState(useForEdit ? rowData.purpose : "");
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (purpose.length < 3) {
      setError("Too Short");
    } else {
      const result = await addEdit({
        useForEdit,
        data: {
          purpose: purpose,
          "files.icon": image,
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
      <DialogHeader className={"overflow-y-scroll"}>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Learner Purpose
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Learning Purpose</label>
            <CustomInput
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              ph="Enter learning purpose"
            />
            <span className="text-red-700">{error}</span>
          </div>

          <input type="file" onChange={onImageChange} className="filetype" />
          <img
            alt="preview image"
            src={image}
            className="w-12 h-12 rounded-full "
          />

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
