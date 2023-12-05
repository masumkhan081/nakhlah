"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import columnTaskUnit from '../table/columnTaskUnit'
import { unit_add_url, unit_get_url } from "../../../lib/url";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Main_URL } from "../../../lib/url";
import Deletion from "../modals/Deletion";
import { staticUnitData } from "../../../static-data/data";
import { useTaskUnit } from "../../../store/useAdminStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react";
import Image from "next/image";
import AddJourney from "../modals/AddJourney";
import AddLesson from "../modals/AddLesson";
import AddTaskUnit from "../modals/AddTaskUnit";

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
