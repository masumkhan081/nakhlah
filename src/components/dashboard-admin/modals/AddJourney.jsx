"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminFormButton from "../../ui-custom/AdminFormButton";

import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../ui-custom/CustomInput";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
import { useJourney } from "../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "../../ui-custom/CustomButton";

export default function AddJourney({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  const existance = useJourney((state) => state.existance);
  const addStatic = useJourney((state) => state.addStatic);
  const updateStatic = useJourney((state) => state.updateStatic);
  const removeStatic = useJourney((state) => state.removeStatic);
  const [journey, setJourney] = useState(useForEdit ? rowData.title : "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (journey.length < 3) {
      setError("Too Short");
    } else if (existance(journey)) {
      setError("Already Exist");
    } else {
      useForEdit
        ? updateStatic({ id: rowData.id, title: journey })
        : addStatic({ id: Math.random(), title: journey });
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
            <label>Learning Journey</label>
            <CustomInput
              type="text"
              value={journey}
              onChange={(e) => setJourney(e.target.value)}
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
