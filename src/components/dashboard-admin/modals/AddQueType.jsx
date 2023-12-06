"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminFormButton from "../../ui-custom/AdminFormButton";

import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../ui-custom/CustomInput";
import { useQueType } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "../../ui-custom/CustomButton";

export default function AddJourney({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const existance = useQueType((state) => state.existance);
  const addStatic = useQueType((state) => state.addStatic);
  const updateStatic = useQueType((state) => state.updateStatic);
  const removeStatic = useQueType((state) => state.removeStatic);
  const [queType, setQueType] = useState(useForEdit ? rowData.title : "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (queType.length < 3) {
      setError("Too Short");
    } else if (existance(queType)) {
      setError("Already Exist");
    } else {
      useForEdit
        ? updateStatic({ id: rowData.id, title: queType })
        : addStatic({ id: Math.random(), title: queType });
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
          {useForEdit ? "Update" : "New"} Learning Start Point
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Question Type</label>
            <CustomInput
              type="text"
              value={queType}
              onChange={(e) => setQueType(e.target.value)}
              ph="New queType Level"
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
