"use client";
import { useEffect } from "react";
import { DataTable } from "../share/DataTable/DataTable";
import { lesson_add_url, lesson_get_url } from "@/components/url";
import  columnLesson  from "../share/Column/Lesson";
import { staticLessonData } from "@/components/data";
import { useLesson } from "../../../store/useAdminStore";

const LearningLesson = () => {
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

export default LearningLesson;
