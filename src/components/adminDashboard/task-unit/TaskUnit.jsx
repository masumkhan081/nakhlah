"use client";
import { useEffect } from "react";
import { DataTable } from "../share/DataTable/DataTable";
import { unit_add_url, unit_get_url } from "@/components/url";
import  columnTaskUnit  from "../share/column/TaskUnit";
import { staticUnitData } from "@/components/data";
import { useTaskUnit } from "../../../store/useAdminStore";

const TaskUnit = () => {
  const unitData = useTaskUnit((state) => state.data);
  const getTaskUnits = useTaskUnit((state) => state.getTaskUnits);
  const addNewTaskUnit = useTaskUnit((state) => state.addNewTaskUnit);
  //   const errorMessageCall = useTaskUnit((state) => state.errorMessage);

  console.log(JSON.stringify(unitData));

  useEffect(() => {
    if (Array.isArray(unitData) && unitData.length === 0) {
      getTaskUnits(unit_get_url);
    }
  }, [unitData, getTaskUnits]);

  // _____________________________________________don,t remove
  // const { data, meta } = unitData;
  // const dataRenderable =
  //   data !== undefined &&
  //   data.map((item) => {
  //     return {
  //       id: item.id,
  //       titleTask: item.attributes.title,
  //       titleJourney: item.attributes.learning_journey.data.attributes.title,
  //     };
  //   });
  // _____________________________________________don,t remove

  return (
    <div className="w-full bg-white  rounded-xl">
      <DataTable data={unitData} columns={columnTaskUnit} view={"task"} />
    </div>
  );
};

export default TaskUnit;
