"use client";
import DataTable from "../../table/DataTable";
import { LearningPurposeGetAllItem_URL } from "../../../../lib/url";
import { useEffect, useState } from "react";
import { useLearnerPurpose } from "../../../../store/useAdminStore";
import { getHandler } from "../../../../lib/requestHandler";
import columnPurpose from "../../table/ColPurpose";
import { Skeleton } from "@/components/ui/skeleton";
import { renderableGoals, renderablePurpose } from "@/lib/fetchFunctions";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

export default function Purposes() {
  const learnerPurposes = useLearnerPurpose((state) => state.data);
  const setPurposes = useLearnerPurpose((state) => state.setPurposes);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-purpose");
      if (response.status === 200) {
        setPurposes(renderablePurpose(response.data.data));
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
        <CustomSkeleton />
      )}
    </div>
  );
}
