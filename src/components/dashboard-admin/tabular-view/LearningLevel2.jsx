"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../share/DataTable/DataTable";
import { levelColumns } from "../share/Column/LearnerLevel";
import { LearningLevelGetAllItem_URL } from "@/components/url";
import { useLearningState } from "@/store/useAdminStore";
import { shallow } from "zustand/shallow";
import { handleGetItem } from "../share/handleGetData";

const LearningLevel2 = () => {
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
      {/* <DataTable columns={purposeColumns} learningTitle={"purpose"}  addURL={LearningPurposeAddItem_URL} getURL={LearningPurposeGetAllItem_URL}/> */}
      {/* <DataTable data={purposeData} columns={purposeColumns} learningTitle={"purpose"} /> */}
      <DataTable data={data} columns={levelColumns} view={"learnerLevel"} />
    </div>
  );
};

export default LearningLevel2;
