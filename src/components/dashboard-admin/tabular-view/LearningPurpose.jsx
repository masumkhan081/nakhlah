"use client";
import DataTable from "../table/DataTable";
// import { purposeColumns } from '../share/columns';
import {
  LearningPurposeAddItem_URL,
  LearningPurposeGetAllItem_URL,
} from "../../../lib/url";
import { shallow } from "zustand/shallow";
// import { purposeData } from '@/components/data';
import { useEffect, useState } from "react";
import { useLearningState } from "../../../store/useAdminStore";
import { handleGetItem } from "../../../lib/handleGetData";
import purposeColumns from "../table/ColPurpose";

const LearningPurpose = () => {
  // const purposeDataCall = useLearningPurposeState((state) => state.data)
  // const getAllItemCall = useLearningPurposeState((state) => state.getAllItem)

  // const addItemAPICall = useLearningState((state) => state.addItem)
  // const errorMessageCall = useLearningState((state) => state.errorMessage)

  // useEffect(() => {
  //     if (Array.isArray(purposeDataCall) && purposeDataCall.length === 0) {
  //         getAllItemCall(LearningPurposeGetAllItem_URL)
  //     }
  // }, [getAllItemCall])
  // const {data, meta} = purposeDataCall
  // const purposeData =  data !== undefined && data.map(item => {
  //     const { id, attributes } = item;
  //     const { purpose, icon } = attributes;

  //     const formats = {
  //         large: icon.data?.attributes?.formats.large?.url,
  //         small: icon.data?.attributes?.formats.small?.url,
  //         medium: icon.data?.attributes?.formats.medium?.url,
  //         thumbnail: icon.data?.attributes?.formats.thumbnail?.url
  //     };

  //     return {
  //         id,
  //         purpose,
  //         formats
  //     };
  // });

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubget = useLearningState.subscribe(
      (state) => state.getAllItem,
      (get, preGet) => get(LearningPurposeGetAllItem_URL),
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    );
    useLearningState.subscribe(
      (state) => state.data,
      (data, preData) => {
        const dataInfo =
          data.data !== undefined && handleGetItem(data.data, "purpose");
        setData(dataInfo);
      }
    );
    return unsubget;
  }, []);
  return (
    <div className="w-full bg-white  rounded-xl">
      {/* <DataTable columns={purposeColumns} learningTitle={"purpose"}  addURL={LearningPurposeAddItem_URL} getURL={LearningPurposeGetAllItem_URL}/> */}
      {/* <DataTable data={purposeData} columns={purposeColumns} learningTitle={"purpose"} /> */}
      <DataTable data={data} columns={purposeColumns} view={"purpose"} />
    </div>
  );
};

export default LearningPurpose;
