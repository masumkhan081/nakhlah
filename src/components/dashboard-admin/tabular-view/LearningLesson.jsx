"use client";
import { useEffect } from "react";
import  DataTable  from "./DataTable";
import { lesson_add_url, lesson_get_url } from "../../../lib/url";
 
import { staticLessonData } from "../../../static-data/data";
import { useLesson } from "../../../store/useAdminStore";
 
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
import Deletion from "../modals/Deletion";
import AddLesson from "../modals/AddLesson";

export default function LearningLesson() {
  const lessonData = useLesson((state) => state.data);
  const getLessons = useLesson((state) => state.getLessons);
  const addNewLesson = useLesson((state) => state.addNewLesson);
  //   const errorMessageCall = useLesson((state) => state.errorMessage);

  useEffect(() => {
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      getLessons(lesson_get_url);
    }
  }, [lessonData]);

  // _____________________________________________don,t remove
  // const { data, meta } = lessonData;
  // const dataRenderable =
  //   data !== undefined &&
  //   data.map((item) => {
  //     return {
  //       id: item.id,
  //       titleLesson: item.attributes.title,
  //       titleLevel:
  //         item.attributes.learning_journey_level.data.attributes.title,
  //       titleTask:
  //         item.attributes.learning_journey_level.data.attributes
  //           .learning_journey_unit.data.attributes.title,
  //       titleJourney:
  //         item.attributes.learning_journey_level.data.attributes
  //           .learning_journey_unit.data.attributes.learning_journey.data
  //           .attributes.title,
  //     };
  //   });
  // _____________________________________________don,t remove

  return (
    <div className="w-full bg-white rounded-xl">
      <DataTable data={lessonData} columns={columnLesson} view={"lesson"} />
    </div>
  );
};

const columnLesson = [
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
    id:"id_lesson_titel",
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Lesson
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("id_lesson_titel")}
      </div>
    ),
  },
  {
    id: "levelOfLesson",
    accessorKey: "level.title",
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
      <div className="  textNormal textSecondaryColor">
        {row.getValue("levelOfLesson")}
      </div>
    ),
  },
  {
    id: "unitOfLeson",
    accessorKey: "level.unit.title",
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
        {row.getValue("unitOfLeson")}
      </div>
    ),
  },
  {
    id: "journeyOfLesson",
    accessorKey: "level.unit.journey.title",
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
        {row.getValue("journeyOfLesson")}
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
              <Deletion rowData={row.original} what="lesson" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddLesson useForEdit={true} rowData={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
