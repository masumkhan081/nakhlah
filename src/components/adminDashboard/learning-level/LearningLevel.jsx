"use client";
import { useEffect } from "react";
import { DataTable } from "../share/DataTable/DataTable";
import { level_add_url, level_get_url } from "@/components/url";
import  columnLevel  from "../share/Column/TaskLevel.jsx";
import { staticLevelData } from "@/components/data";
import { useLevel } from "../../../store/useAdminStore";

const LearningLevel = () => {
  const levelData = useLevel((state) => state.data);
  const getLevels = useLevel((state) => state.getLevels);
  const addNewLevel = useLevel((state) => state.addNewLevel);
  //   const errorMessageCall = useLevel((state) => state.errorMessage);

  useEffect(() => {
    if (Array.isArray(levelData) && levelData.length === 0) {
      getLevels(level_get_url);
    }
  }, [levelData]);

  // const { data, meta } = levelData;
  // const dataRenderable =
  //   data !== undefined &&
  //   data.map((item) => {
  //     return {
  //       id: item.id,
  //       titleLevel: item.attributes.title,
  //       titleTask: item.attributes.learning_journey_unit.data.attributes.title,
  //       titleJourney:
  //         item.attributes.learning_journey_unit.data.attributes.learning_journey
  //           .data.attributes.title,
  //     };
  //   });

  return (
    <div className="w-full bg-white  rounded-xl">
      <DataTable
        data={levelData}
        columns={columnLevel}
        view={"level"}
      />
    </div>
  );
};

export default LearningLevel;
