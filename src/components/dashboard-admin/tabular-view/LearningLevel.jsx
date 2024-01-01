"use client";
import { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import colLearningLevel from "../table/ColLearningLevel";
import { useLearningLevel } from "../../../store/useAdminStore";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

export default function LearningLevel() {
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);

  useEffect(() => {
    const fetch = async () => {
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
      fetch();
    }
  }, [levelData]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {levelData.length != 0 ? (
        <DataTable
          data={levelData}
          columns={colLearningLevel}
          view={"learning-level"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
