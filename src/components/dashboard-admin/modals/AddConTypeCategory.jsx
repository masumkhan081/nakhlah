"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminFormButton from "../../ui-custom/AdminFormButton";

import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../ui-custom/CustomInput";
import { useConTypeCategory } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "../../ui-custom/CustomButton";

export default function AddJourney({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  const existance = useConTypeCategory((state) => state.existance);
  const addStatic = useConTypeCategory((state) => state.addStatic);
  const updateStatic = useConTypeCategory((state) => state.updateStatic);
  const [conTypeCategory, setConTypecategory] = useState(
    useForEdit ? rowData.title : ""
  );
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (conTypeCategory.length < 3) {
      setError("Too Short");
    } else if (existance(conTypeCategory)) {
      setError("Already Exist");
    } else {
      useForEdit
        ? updateStatic({ id: rowData.id, title: conTypeCategory })
        : addStatic({ id: Math.random(), title: conTypeCategory });
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
          {useForEdit ? "Update" : "New"} Content Type Category{" "}
          <span className="text-sm text-bg-slate-500">(ex:Image)</span>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Category Name</label>
            <CustomInput
              type="text"
              value={conTypeCategory}
              onChange={(e) => setConTypecategory(e.target.value)}
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
