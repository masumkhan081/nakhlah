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
import DataTable from "./DataTable";
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

const columnLevel = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="textNormal textPrimaryColor">ID</div>,
    cell: ({ row }) => {
      const rowId = parseInt(row.id) + 1;
      return <div className="textSecondaryColor textNormal">{rowId} </div>;
    },
  },
  {
    id: "id_level_titel",
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" textNormal textSecondaryColor">
        {row.getValue("id_level_titel")}
      </div>
    ),
  },
  {
    id: "unitOfLevel",
    accessorKey: "unit.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Unit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("unitOfLevel")}
      </div>
    ),
  },
  {
    id: "journeyOfLevel",
    accessorKey: "unit.journey.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Journey
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("journeyOfLevel")}
      </div>
    ),
  },

  {
    id: "actions",
    header: () => (
      <div className="textNormal textPrimaryColor text-center">Actions</div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <Trash2 className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <Deletion rowData={row.original} what="level" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddLevel useForEdit={true} rowData={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
