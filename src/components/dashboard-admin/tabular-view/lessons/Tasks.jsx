"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import columnTaskUnit from "../../table/ColTaskUnit";
import { useLearningUnit } from "../../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableTasks } from "@/lib/fetchFunctions";

export default function Tasks() {
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit"); 
      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetch();
    }
  }, [unitData]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {unitData.length != 0 ? (
        <DataTable
          data={unitData}
          columns={columnTaskUnit}
          view={"learning-unit"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};


