"use client";
import { useEffect, useState } from "react";
import { goalColumns } from "../share/Column/Goal";
import { DataTable } from "../share/DataTable/DataTable";
import { shallow } from "zustand/shallow";
// import {
//   LearningGoalAddItem_URL,
//   LearningGoalGetAllItem_URL,
// } from "@/components/url";
// import { goalColumns } from "../share/columns";
// import { goalData } from "@/components/data";
import { useLearningState } from "@/store/useAdminStore";
import { LearningGoalGetAllItem_URL } from "@/components/url";
import { handleGetItem } from "../share/handleGetData";

const LearningGoal = () => {
  // const goalDataCall = useLearningState((state) => state.data)
  // const getAllItemCall = useLearningState((state) => state.getAllItem)
  // const addItemAPICall = useLearningState((state) => state.addItem)
  // const errorMessageCall = useLearningState((state) => state.errorMessage)
  // useEffect(() => {
  //     if (Array.isArray(goalDataCall) && goalDataCall.length === 0) {
  //         getAllItemCall(LearningGoalGetAllItem_URL)
  //     }
  // }, [goalDataCall, getAllItemCall])
  // const {data, meta} = goalDataCall
  // const goalData =  data !== undefined && data.map(item => {
  //     const { id, attributes } = item;
  //     const { goal, time } = attributes;
  //     return {
  //         id,
  //         goal,
  //         time
  //     };
  // });
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubget = useLearningState.subscribe(
      (state) => state.getAllItem,
      (get, preGet) => get(LearningGoalGetAllItem_URL),
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    );
    useLearningState.subscribe(
      (state) => state.data,
      (data, preData) => {
        const dataInfo =
          data.data !== undefined && handleGetItem(data.data, "goal");
        setData(dataInfo);
      }
    );
    return unsubget;
  }, []);
  return (
    <div className="w-full bg-white  rounded-xl">
      {/* <DataTable columns={goalColumns} learningTitle={"goal"} addURL={LearningGoalAddItem_URL} getURL={LearningGoalGetAllItem_URL}/> */}
      {/* <DataTable data={goalData} columns={goalColumns} learningTitle={"goal"} /> */}
      <DataTable data={data} columns={goalColumns} view={"goal"} />
    </div>
  );
};

export default LearningGoal;
