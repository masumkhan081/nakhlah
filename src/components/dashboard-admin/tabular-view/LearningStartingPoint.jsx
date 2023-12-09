"use client";
import { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import { useLearnerStartPoint } from "../../../store/useAdminStore";
import ColStartPoint from "../table/ColStartPoint";
import { Skeleton } from "@/components/ui/skeleton";
import { getHandler } from "@/lib/requestHandler";

const LearningStartingPoint = () => {
  //
  const startPoints = useLearnerStartPoint((state) => state.data);
  const setStartPoints = useLearnerStartPoint((state) => state.setStartPoints);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-start-point");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
            subtitle: item.attributes.subtitle,
          };
        });
        setStartPoints(data);
      }
    };
    if (Array.isArray(startPoints) && startPoints.length === 0) {
      fetch();
    }
  }, [startPoints]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {startPoints.length != 0 ? (
        <DataTable
          data={startPoints}
          columns={ColStartPoint}
          view={"learner-start-point"}
        />
      ) : (
        <div className="w-full md:py-12 sm:py-6 flex flex-col gap-4 justify-center items-center">
          <Skeleton className="bg-slate-500 h-16 w-16 rounded-full" />
          <div className="flex-col gap-6">
            <Skeleton className="bg-slate-400  w-[250px] mb-2 text-slate-50 ps-2 py-1 ">
              Loading ...
            </Skeleton>
            <Skeleton className="bg-slate-300 h-4 w-[200px] mb-2" />
            <Skeleton className="bg-slate-200 w-[150px] h-[20px] rounded-md " />
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningStartingPoint;
