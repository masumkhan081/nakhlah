"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import columnLesson from "../table/ColLesson";
import { lesson_add_url, lesson_get_url } from "../../../lib/url";

import { staticLessonData } from "../../../static-data/data";
import { useLearningLesson } from "../../../store/useAdminStore";

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
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

export default function LearningLesson() {
  const lessonData = useLearningLesson((state) => state.data);

  const setLessons = useLearningLesson((state) => state.setLessons);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey_level } = item.attributes;
          const { learning_journey_unit } =
            learning_journey_level.data.attributes;
          const { learning_journey } = learning_journey_unit.data.attributes;

          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey_level: {
              id: learning_journey_level.id,
              title: learning_journey_level.data.attributes.title,
              learning_journey_unit: {
                id: learning_journey_unit.id,
                title: learning_journey_unit.data.attributes.title,
                learning_journey: {
                  id: learning_journey.id,
                  title: learning_journey.data.attributes.title,
                },
              },
            },
          };
        });
        setLessons(data);
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetch();
    }
  }, [levelData]);

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
    <div className="w-full bg-white  rounded-xl">
      {lessonData.length != 0 ? (
        <DataTable
          data={lessonData}
          columns={columnLesson}
          view={"learning-level"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
