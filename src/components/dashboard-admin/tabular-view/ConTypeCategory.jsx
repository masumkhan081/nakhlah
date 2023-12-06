"use client";
import DataTable from "../table/DataTable";
import {
  LearningGoalAddItem_URL,
  LearningGoalGetAllItem_URL,
} from "../../../lib/url";
import colConTypeCategory from "../table/colConTypeCategory";
import { useConTypeCategory } from "../../../store/useAdminStore";
import { useEffect } from "react";

const ConTypeCategory = () => {
  const conTypeCatagories = useConTypeCategory((state) => state.data);

  useEffect(() => {
    if (Array.isArray(conTypeCatagories) && conTypeCatagories.length === 0) {
      // getJournies(journey_get_url);
    }
  }, [conTypeCatagories]);

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
      <DataTable
        data={conTypeCatagories}
        columns={colConTypeCategory}
        learningTitle={"content-type-category"}
      />
    </div>
  );
};

export default ConTypeCategory;
