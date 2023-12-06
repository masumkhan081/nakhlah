"use client";
import DataTable from "../table/DataTable";
import {
  LearningGoalAddItem_URL,
  LearningGoalGetAllItem_URL,
} from "../../../lib/url";
import colContentType from "../table/colContentType";
import { useConType } from "../../../store/useAdminStore";
import { useEffect } from "react";

const ContentType = () => {
  //

  const conTypeData = useConType((state) => state.data);

  useEffect(() => {
    if (Array.isArray(conTypeData) && conTypeData.length === 0) {
      // getJournies(journey_get_url);
    }
  }, [conTypeData]);

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
        data={conTypeData}
        columns={colContentType}
        view="content-type"
      />
    </div>
  );
};

export default ContentType;
