"use client";

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
  useLearningLesson,
  useLearningJourney,
  useLearningLevel,
  useLearningUnit,
} from "../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";

export default function AddLesson({ rowData, title, useForEdit }) {
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };

  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }

  function filterLevelsByUnit(id) {
    setFilteredLevels(
      levelData.filter((item) => item.learning_journey_unit.id == id)
    );
  }

  const [lessonName, setLessonName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_unit.learning_journey.id,
          title: rowData.learning_journey_unit.learning_journey.title,
        }
      : initStateSelection
  );
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_unit.id,
          title: rowData.learning_journey_unit.title,
        }
      : initStateSelection
  );
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_unit.learning_journey_level.id,
          title: rowData.learning_journey_unit.learning_journey_level.title,
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

  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  //
  const afterUpdate = useLearningLesson((state) => state.afterUpdate);
  const afterAdd = useLearningLesson((state) => state.afterAdd);

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    if (
      selectedJourney.title != "" &&
      selectedUnit.title != "" &&
      selectedLevel.title != "" &&
      !(lessonName.length < 3)
    ) {
      const data = {
        title: lessonName,
        learning_journey_level: {
          id: selectedLevel.id,
          title: selectedLevel.title,
          learning_journey_unit: {
            id: selectedUnit.id,
            title: selectedUnit.title,
            learning_journey: {
              id: selectedJourney.id,
              title: selectedJourney.title,
            },
          },
        },
      };

      const result = useForEdit
        ? await putHandler("learning-lesson", rowData.id, { data })
        : await postHandler("learning-lesson", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;

        data = {
          id: data.id,
          title: data.attributes.title,
          learning_journey_level: {
            id: selectedLevel.id,
            title: selectedLevel.title,
            learning_journey_unit: {
              id: selectedUnit.id,
              title: selectedUnit.title,
              learning_journey: {
                id: selectedJourney.id,
                title: selectedJourney.title,
              },
            },
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
        setError({
          err0: errors[0].message,
          err1: errors[1]?.message,
          err2: errors[2]?.message,
          err3: errors[3]?.message,
          err4: errors[4]?.message,
        });
      }
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
    const fetchJournies = async () => {
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

    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetchJournies();
    }
  }, [journeyData]);

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await getHandler("learning-unit");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey } = item.attributes;

          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey: {
              id: learning_journey.data.id,
              title: learning_journey.data.attributes.title,
            },
          };
        });
        setUnits(data);
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetchUnits();
    }
  }, [unitData]);

  useEffect(() => {
    const fetchLevels = async () => {
      const response = await getHandler("learning-level");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey_unit } = item.attributes;
          const { learning_journey } = learning_journey_unit.data.attributes;
          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey_unit: {
              id: learning_journey_unit.data.id,
              title: learning_journey_unit.data.attributes.title,
              learning_journey: {
                id: learning_journey.data.id,
                title: learning_journey.data.attributes.title,
              },
            },
          };
        });
        setLevels(data);
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetchLevels();
    }
  }, [levelData]);

  useEffect(() => {
    if (selectedJourney.id != null) {
      useForEdit ? "" : setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);

  useEffect(() => {
    if (selectedUnit.id != null) {
      useForEdit ? "" : setSelectedLevel(initStateSelection);
      filterLevelsByUnit(selectedUnit.id);
    }
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
                options={journeyData}
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
                options={filteredUnits}
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
                options={filteredLevels}
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
