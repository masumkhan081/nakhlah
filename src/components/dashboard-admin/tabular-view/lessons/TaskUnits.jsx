"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import colLearningLevel from "../../table/ColLearningLevel";
import { useLearningLevel } from "../../../../store/useAdminStore";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableTaskUnits } from "@/lib/fetchFunctions";

export default function TaskUnits() {
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
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
