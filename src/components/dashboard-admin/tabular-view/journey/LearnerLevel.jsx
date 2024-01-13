"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import ColLearnerLevel from "../../table/ColLearnerLevel";
import { useLearnerLevel } from "../../../../store/useAdminStore";

import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableLearnerLevel } from "@/lib/fetchFunctions";

const LearnerLevel = () => {
  const learnerLevels = useLearnerLevel((state) => state.data);
  const setLearnerLevels = useLearnerLevel((state) => state.setLevels);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-level");
      if (response.status === 200) {
        setLearnerLevels(renderableLearnerLevel(response.data.data));
      }
    };
    if (Array.isArray(learnerLevels) && learnerLevels.length === 0) {
      fetch();
    }
  }, [learnerLevels]);

  return (
    <div className="w-full  bg-white  rounded-xl">
      {learnerLevels.length != 0 ? (
        <DataTable
          data={learnerLevels}
          columns={ColLearnerLevel}
          view={"learner-level"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};

export default LearnerLevel;
