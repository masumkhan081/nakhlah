"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import {} from "../../../lib/url"; 
import { useQueType } from "../../../store/useAdminStore";
import columnQueType from "../table/columnQueType";

const QueType = () => {

  const queTypeData = useQueType((state) => state.data);
  // const addStatic = useJourney((state) => state.addStatic);
  //   const errorMessageCall = useJourney((state) => state.errorMessage);

  useEffect(() => {
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      // getJournies(journey_get_url);
    }
  }, [queTypeData]);

  // _____________________________________________don,t remove
  // const { data, meta } = journeyData;
  // const dataRenderable =
  //   data !== undefined &&
  //   data.map((item) => {
  //     const { id, attributes } = item;
  //     const { title } = attributes;
  //     return {
  //       id,
  //       title,
  //     };
  //   });
  // _____________________________________________don,t remove

  return (
    <div className="w-full bg-white  rounded-xl">
      <DataTable data={queTypeData} columns={columnQueType} view={"question-type"} />
    </div>
  );
};

export default QueType;
