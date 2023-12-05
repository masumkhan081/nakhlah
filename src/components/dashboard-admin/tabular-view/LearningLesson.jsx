"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import columnLesson from "../table/columnLesson";
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
}
