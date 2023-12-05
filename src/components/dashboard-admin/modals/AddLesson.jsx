"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSelect from "../../ui-custom/CustomSelect";
import CustomButton from "../../ui-custom/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../ui-custom/CustomInput";
import {
  useLesson,
  useJourney,
  useLevel,
  useTaskUnit,
} from "../../../store/useAdminStore";
import { useEffect, useState } from "react";

export default function AddLesson({ rowData, title, useForEdit }) {
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };

  const [lessonName, setLessonName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.level.unit.journey.id,
          title: rowData.level.unit.journey.title,
        }
      : initStateSelection
  );
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.level.unit.id,
          title: rowData.level.unit.title,
        }
      : initStateSelection
  );
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.level.id,
          title: rowData.level.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
    err4: "",
  });

  const journies = useJourney((state) => state.data);
  const existance = useLesson((state) => state.existance);
  const addStatic = useLesson((state) => state.addStatic);
  const updateStatic = useLesson((state) => state.updateStatic);
  const removeStatic = useLesson((state) => state.removeStatic);
  const filteredUnits = useTaskUnit((state) => state.filteredUnits);
  const filteredLevels = useLevel((state) => state.filteredLevels);

  function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    if (existance(selectedLevel.id, lessonName)) {
      setError({
        err1: err_1,
        err2: err_2,
        err3: err_3,
        err4: err_4,
        err0: "Already Exists",
      });
    } else if (
      selectedJourney.title != "" &&
      selectedUnit.title != "" &&
      selectedLevel.title != "" &&
      !(lessonName.length < 3)
    ) {
      useForEdit
        ? updateStatic({
            id: rowData.id,
            title: lessonName,
            level: {
              ...selectedLevel,
              unit: { ...selectedUnit, journey: { ...selectedJourney } },
            }, // redundant
          })
        : addStatic({
            id: Math.floor(Math.random() * 10),
            title: lessonName,
            level: {
              ...selectedLevel,
              unit: {
                ...selectedUnit,
                journey: {
                  ...selectedJourney,
                },
              },
            },
          });
      toast({
        title: useForEdit
          ? "Item Updated Succesfully"
          : "Item Added Successfully",
      });
      document.getElementById("closeDialog")?.click();
    } else {
      if (selectedJourney.id == null) {
        err_1 = "Select Journey Level First";
      }
      if (selectedUnit.id == null) {
        err_2 = "Select A Task-unit";
      }
      if (selectedLevel.id == null) {
        err_3 = "Select Task Level Before Creating New Lesson";
      }
      if (lessonName.length < 3) {
        err_4 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2, err3: err_3, err4: err_4 });
    }
  }

  useEffect(() => {
    const unitAfterFilter = filteredUnits(selectedJourney.id);
    useForEdit == false ? setSelectedUnit(initStateSelection) : "";
    setUnits(unitAfterFilter);
  }, [selectedJourney]);

  useEffect(() => {
    const levelAfterFilter = filteredLevels(selectedUnit.id);
    useForEdit == false ? setSelectedLevel(initStateSelection) : "";
    setLevels(levelAfterFilter);
  }, [selectedUnit]);

  return (
    <>
      <DialogHeader className="">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Task Lesson
        </DialogTitle>
        <DialogDescription className="textNormal textSecondaryColor">
          Select from top to add new lesson
        </DialogDescription>
        <div className="overflow-y-scroll h-[430px] pr-4 ">
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
              <label>Select Task Unit</label>
              <CustomSelect
                value={selectedUnit}
                options={units}
                bg="light"
                onChange={(value) =>
                  setSelectedUnit({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err2}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label>Select Task Level</label>
              <CustomSelect
                value={selectedLevel}
                options={levels}
                bg="light"
                onChange={(value) =>
                  setSelectedLevel({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err3}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex justify-between">
                <span>Lesson Name</span>
                <span className=" text-red-700">{error.err0}</span>
              </label>
              <CustomInput
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                ph="New Lesson"
              />
              <span className="text-red-700">{error.err4}</span>
            </div>

            <CustomButton
              txt={useForEdit ? "Update" : "Add"}
              type="submit"
              style="text-blue-800"
            />
          </form>
        </div>
      </DialogHeader>
    </>
  );
}
