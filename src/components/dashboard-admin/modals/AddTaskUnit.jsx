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
import {
  useLearningJourney,
  useLearningUnit,
} from "../../../store/useAdminStore";
import CustomSelect from "../../ui-custom/CustomSelect";
import CustomButton from "../../ui-custom/CustomButton";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";

export default function AddTaskUnit({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  const journies = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const addEdit = useLearningUnit((state) => state.addEdit);
  const afterAdd = useLearningUnit((state) => state.afterAdd);
  const afterUpdate = useLearningUnit((state) => state.afterUpdate);
  //
  const [taskName, setTaskName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey.id,
          title: rowData.learning_journey.title,
        }
      : {
          id: null,
          title: "",
        }
  );
  const [error, setError] = useState({ err0: "", err1: "", err2: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    let err_1 = "";
    let err_2 = "";

    if (selectedJourney.title != "" && !(taskName.length < 3)) {
      const data = {
        title: taskName,
        learning_journey: {
          connect: [selectedJourney.id],
        },
      };

      const result = useForEdit
        ? await putHandler("learning-unit", rowData.id, { data })
        : await postHandler("learning-unit", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;
        data = {
          id: data.id,
          title: data.attributes.title,
          learning_journey: {
            id: selectedJourney.id,
            title: selectedJourney.title,
          },
        };

        useForEdit ? afterUpdate(data) : afterAdd(data);
        toast({
          title: useForEdit
            ? "Item Updated Succesfully"
            : "Item Added Successfully",
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        let errors = result.data.error.details.errors;
        setError({ err0: errors[0].message, err1: errors[1]?.message });
      }
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

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");

      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setJournies(dataRenderable);
      }
    };
    if (Array.isArray(journies) && journies.length === 0) {
      fetch();
    }
  }, [journies]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Learning Unit
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Select Learning Journey</label>
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
              <span>Learning Unit Name</span>
              <span className="text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              ph="Enter unit title"
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
