"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import columnLesson from "../../table/ColLesson";
import { useLearningLesson } from "../../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableLessons } from "@/lib/fetchFunctions";

export default function Lessons() {
  //
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);

  return (
    <div className=" flex-grow w-full bg-white  rounded-xl   ">
      {lessonData.length != 0 ? (
        <DataTable
          data={lessonData}
          columns={columnLesson}
          view={"learning-lesson"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
