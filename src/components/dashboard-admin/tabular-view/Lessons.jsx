"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import columnLesson from "../table/ColLesson";
import { useLearningLesson } from "../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";

export default function Lessons() {
  //
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      console.log(response.data);
      if (response.status === 200) {
        const data = response?.data?.data
          ?.filter((theData) => {
            // alert("data :: " + JSON.stringify(theData));
            return theData != null;
          })
          .map((item) => {
            const learning_journey_level =
              item?.attributes?.learning_journey_level;

            const learning_journey_unit =
              learning_journey_level?.data?.attributes?.learning_journey_unit;
            const learning_journey =
              learning_journey_unit?.data?.attributes?.learning_journey;

            return {
              id: item.id,
              title: item.attributes?.title,
              learning_journey_level: {
                id: learning_journey_level?.data?.id,
                title: learning_journey_level?.data?.attributes?.title,
                learning_journey_unit: {
                  id: learning_journey_unit?.data?.id,
                  title: learning_journey_unit?.data?.attributes?.title,
                  learning_journey: {
                    id: learning_journey?.data?.id,
                    title: learning_journey?.data?.attributes?.title,
                  },
                },
              },
            };
          });
        setLessons(data);
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
