"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import columnTaskUnit from "../../table/ColTaskUnit";
import {
  useLearningUnit,
  useLoadingState,
} from "../../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableTasks } from "@/lib/fetchFunctions";

export default function Tasks() {
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");

      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
        toggleLoading(false);
      }
    };
    if (loading == false && Array.isArray(unitData) && unitData.length === 0) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className="w-full bg-white h-full rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={unitData}
          columns={columnTaskUnit}
          view={"learning-unit"}
        />
      )}
    </div>
  );
}
