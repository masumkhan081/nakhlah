"use client";
import { useEffect, useState } from "react";
import goalColumns from "../table/ColGoal";
import DataTable from "../table/DataTable"; 
import { useLearnerGoal } from "../../../store/useAdminStore";
import { getHandler } from "../../../lib/requestHandler"; 
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

const LearningGoal = () => {
  // 
  const learnerGoals = useLearnerGoal((state) => state.data);
  const setGoals = useLearnerGoal((state) => state.setGoals);
  const addEdit = useLearnerGoal((state) => state.addEdit);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-goal");
       
      if (response.status === 200) {
        const goalData = response.data.data.map((item) => {
          return {
            id: item.id,
            goal: item.attributes.goal,
            time: item.attributes.time,
          };
        });
        setGoals(goalData);
      }
    };
    if (Array.isArray(learnerGoals) && learnerGoals.length === 0) {
      fetch();
    }
  }, [learnerGoals]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {learnerGoals.length != 0 ? (
        <DataTable data={learnerGoals} columns={goalColumns} view={"learner-goal"} />
      ) : (
        <CustomSkeleton/>
      )}
    </div>
  );
};

export default LearningGoal;
