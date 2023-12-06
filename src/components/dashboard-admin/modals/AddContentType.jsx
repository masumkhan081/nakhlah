"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminFormButton from "../../ui-custom/AdminFormButton";

import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../ui-custom/CustomInput";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
import { useConType } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "../../ui-custom/CustomButton";

export default function AddContentType({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const existance = useConType((state) => state.existance);
  const addStatic = useConType((state) => state.addStatic);
  const updateStatic = useConType((state) => state.updateStatic);
  const [contentType, setContentType] = useState(useForEdit ? rowData.title : "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (contentType.length < 3) {
      setError("Too Short");
    } else if (existance(contentType)) {
      setError("Already Exist");
    } else {
      useForEdit
        ? updateStatic({ id: rowData.id, title: contentType })
        : addStatic({ id: Math.random(), title: contentType });
      toast({
        title: useForEdit
          ? "Item Updated Succesfully"
          : "Item Added Successfully",
      });
      document.getElementById("closeDialog")?.click();
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Content Type
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Content Type</label>
            <CustomInput
              type="text"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              ph="New Journey Level"
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