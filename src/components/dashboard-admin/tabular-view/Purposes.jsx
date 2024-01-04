"use client";
import DataTable from "../table/DataTable";
import { LearningPurposeGetAllItem_URL } from "../../../lib/url";
import { useEffect, useState } from "react";
import { useLearnerPurpose } from "../../../store/useAdminStore";
import { getHandler } from "../../../lib/requestHandler";
import columnPurpose from "../table/ColPurpose";
import { Skeleton } from "@/components/ui/skeleton";

export default function Purposes  () {
  const learnerPurposes = useLearnerPurpose((state) => state.data);
  const setPurposes = useLearnerPurpose((state) => state.setPurposes);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-purpose");
      if (response.status === 200) {
        // alert(JSON.stringify(response.data.data));
        const purposeData = response.data.data.map((item) => {
          const { icon } = item.attributes;
          const formats = {
            large: icon?.data?.attributes?.formats.large?.url,
            small: icon?.data?.attributes?.formats.small?.url,
            medium: icon?.data?.attributes?.formats.medium?.url,
            thumbnail: icon?.data?.attributes?.formats.thumbnail?.url,
          };
          return {
            id: item.id,
            purpose: item.attributes.purpose,
            formats,
          };
        });
        setPurposes(purposeData);
      }
    };
    if (Array.isArray(learnerPurposes) && learnerPurposes.length === 0) {
      fetch();
    }
  }, [learnerPurposes]);

  return (
    <div className="w-full  bg-white  rounded-xl">
      {learnerPurposes.length != 0 ? (
        <DataTable
          data={learnerPurposes}
          columns={columnPurpose}
          view={"learner-purpose"}
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


