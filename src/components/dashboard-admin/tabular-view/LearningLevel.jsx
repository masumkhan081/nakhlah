"use client";
import { staticUnitData } from "../../../static-data/data";
import { useTaskUnit } from "../../../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Main_URL } from "../../../lib/url";
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
import AddLevel from "../modals/AddLevel";
import Deletion from "../modals/Deletion";
import AddTaskUnit from "../modals/AddTaskUnit";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import { level_add_url, level_get_url } from "../../../lib/url";

import { staticLevelData } from "../../../static-data/data";
import { useLevel } from "../../../store/useAdminStore";

export default function LearningLevel() {
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
      <DataTable data={levelData} columns={columnLevel} view={"level"} />
    </div>
  );
}


