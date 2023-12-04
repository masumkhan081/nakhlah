"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "@/components/share/CustomInput";
//
import {
  level_by_journey_get_url,
  journey_get_url,
  level_add_url,
} from "@/components/url";
import {
  useJourney,
  useTaskUnit,
  useLevel,
} from "../../../../store/useAdminStore";
import CustomSelect from "@/components/share/CustomSelect";
import CustomButton from "@/components/share/CustomButton";

export default function AddLevel({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };

  const [levelName, setLevelName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.unit.journey.id,
          title: rowData.unit.journey.title,
        }
      : initStateSelection
  );
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.unit.id,
          title: rowData.unit.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
  });

  const journies = useJourney((state) => state.data);
  //useTaskUnit((state) => state.filteredUnits(selectedJourney.id));
  const existance = useLevel((state) => state.existance);
  const addStatic = useLevel((state) => state.addStatic);
  const updateStatic = useLevel((state) => state.updateStatic);
  const removeStatic = useLevel((state) => state.removeStatic);
  const filteredUnits = useTaskUnit((state) => state.filteredUnits);

  function handleSubmit(e) {
    e.preventDefault();
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    if (existance(selectedUnit.id, levelName)) {
      setError({
        err1: err_1,
        err2: err_2,
        err3: err_3,
        err0: "Already Exists",
      });
    } else if (
      selectedJourney.title != "" &&
      selectedUnit.title != "" &&
      !(levelName.length < 3)
    ) {
      useForEdit
        ? updateStatic({
            id: rowData.id,
            title: levelName,
            unit: {
              ...selectedUnit,
              journey: { ...selectedJourney },
            },
          })
        : addStatic({
            id: Math.floor(Math.random() * 10),
            title: levelName,
            unit: {
              ...selectedUnit,
              journey: selectedJourney,
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
        err_2 = "Select A Task Before Creating New Level";
      }
      if (levelName.length < 3) {
        err_3 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2, err3: err_3 });
    }
  }

  useEffect(() => {
    const unitAfterFilter = filteredUnits(selectedJourney.id);
    setSelectedUnit(initStateSelection);
    setUnits(unitAfterFilter);
  }, [selectedJourney]);

  // useEffect(() => {
  //   if (Array.isArray(journeyData) && journeyData.length === 0) {
  //     getJournies(journey_get_url);
  //   }
  // }, [journeyData, getJournies]);

  // useEffect(() => {
  //   if (Array.isArray(journeyData) && journeyData.length === 0) {
  //     getJournies(level_by_journey_get_url);
  //   }
  // }, [selectedJourney]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Task Level
        </DialogTitle>
        <DialogDescription className="textNormal textSecondaryColor">
          Select from top to add new level
        </DialogDescription>

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
            <label className="flex justify-between">
              <span>Level Name</span>
              <span className=" text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              ph="New Level Unit"
            />
            <span className="text-red-700">{error.err3}</span>
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
