"use client";
import { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import { useLearnerStartPoint } from "../../../store/useAdminStore";
import ColStartPoint from "../table/ColStartPoint";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

export default function StartPoints() {
  //
  const startPoints = useLearnerStartPoint((state) => state.data);
  const setStartPoints = useLearnerStartPoint((state) => state.setStartPoints);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-start-point");
      console.log(response.data);
      if (response.status === 200) {
        // alert(JSON.stringify(response.data.data));
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
        <CustomSkeleton />
      )}
    </div>
  );
}
