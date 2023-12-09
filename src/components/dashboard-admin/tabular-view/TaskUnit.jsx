"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import columnTaskUnit from "../table/ColTaskUnit";
import { useLearningUnit } from "../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";

const TaskUnit = () => {
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey } = item.attributes;
          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey: {
              id: learning_journey.id,
              title: learning_journey.data.attributes.title,
            },
          };
        });
        setUnits(data);
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

export default TaskUnit;
