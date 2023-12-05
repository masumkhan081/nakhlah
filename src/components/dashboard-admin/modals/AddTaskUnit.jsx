"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  journey_add_url,
  unit_post_url,
  journey_get_url,
} from "../../../lib/url";

import * as z from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminFormButton from "../../ui-custom/AdminFormButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import InputField from "../../ui-custom/InputField";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../ui-custom/CustomInput";
import { useJourney, useTaskUnit } from "../../../store/useAdminStore";
import CustomSelect from "../../ui-custom/CustomSelect";
import CustomButton from "../../ui-custom/CustomButton";

export default function AddTaskUnit({ rowData, title, useForEdit }) {
  const { toast } = useToast();
  // const data = useTaskUnit((state) => state.data);
  const journies = useJourney((state) => state.data);
  const addStatic = useTaskUnit((state) => state.addStatic);
  const existance = useTaskUnit((state) => state.existance);
  const updateStatic = useTaskUnit((state) => state.updateStatic);
  const removeStatic = useTaskUnit((state) => state.removeStatic);
  const [taskName, setTaskName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? { id: rowData.journey.id, title: rowData.journey.title }
      : {
          id: null,
          title: "",
        }
  );
  const [error, setError] = useState({ err0: "", err1: "", err2: "" });

  function handleSubmit(e) {
    e.preventDefault();

    let err_1 = "";
    let err_2 = "";

    if (existance(selectedJourney.id, taskName)) {
      setError({ err1: err_1, err2: err_2, err0: "Already Exists" });
    } else if (selectedJourney.title != "" && !(taskName.length < 3)) {
      useForEdit
        ? updateStatic({
            id: rowData.id,
            title: taskName,
            journey: selectedJourney,
          })
        : addStatic({
            id: Math.random(),
            title: taskName,
            journey: selectedJourney,
          });
      toast({
        title: useForEdit
          ? "Item Updated Succesfully"
          : "Item Added Successfully",
      });
      document.getElementById("closeDialog")?.click();
    } else {
      if (selectedJourney.title === "") {
        err_1 = "Select Journey Level Before Task Name";
      }
      if (taskName.length < 3) {
        err_2 = "Too Short";
      }
      setError({ err0: "", err1: err_1, err2: err_2 });
    }
  }

  // useEffect(() => {
  //   console.log(JSON.stringify(journeyData));
  //   if (Array.isArray(journeyData) && journeyData.length === 0) {
  //     getJournies(journey_get_url);
  //   }
  // }, [journeyData, getJournies]);

  // const { data, meta } = journeyData;
  // const dataRenderable = data?.map((item) => {
  //   const { id, attributes } = item;
  //   const { title } = attributes;
  //   return {
  //     id,
  //     title,
  //   };
  // });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Task Form
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Select Journey</label>
            <CustomSelect
              value={selectedJourney}
              options={journies}
              bg="light"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Task Name</span>
              <span className="text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              ph="New Task Unit"
            />
            <span className="text-red-700">{error.err2}</span>
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800"
          />
        </form>

        {/* {errorMessageCall !== '' && <p className='text-red-600 text'>{errorMessageCall}</p>} */}
      </DialogHeader>
    </>
  );
}
