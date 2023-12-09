"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import levelColumns from "../table/ColLearnerLevel";
import { LearningLevelGetAllItem_URL } from "../../../lib/url";
import { useLearningState } from "../../../store/useAdminStore";
import { shallow } from "zustand/shallow";
import { handleGetItem } from "../../../lib/handleGetData";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

const LearningJourneyLevel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubget = useLearningState.subscribe(
      (state) => state.getAllItem,
      (get, preGet) => get(LearningLevelGetAllItem_URL),
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    );
    useLearningState.subscribe(
      (state) => state.data,
      (data, preData) => {
        const dataInfo =
          data.data !== undefined && handleGetItem(data.data, "learnerLevel");
        setData(dataInfo);
      }
    );
    return unsubget;
  }, []);
  return (
    <div className="w-full bg-white  rounded-xl">
     
      <DataTable data={data} columns={levelColumns} view={"learnerLevel"} />
     {/* <CustomSkeleton/> */}
    </div>
  );
};

export default LearningJourneyLevel;
