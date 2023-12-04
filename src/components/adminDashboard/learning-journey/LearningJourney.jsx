"use client";
import { useEffect } from "react";
import { DataTable } from "../share/DataTable/DataTable";
import { journey_add_url, journey_get_url } from "@/components/url";
import columnJourney from "../share/column/Journey";
import { staticJourneyData } from "@/components/data";
import { useJourney } from "../../../store/useAdminStore";

const LearningJourney = () => {
  const journeyData = useJourney((state) => state.data);
  const getJournies = useJourney((state) => state.getJournies);
  const addNewJourney = useJourney((state) => state.addNewJourney);
  //   const errorMessageCall = useJourney((state) => state.errorMessage);

  useEffect(() => {
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      getJournies(journey_get_url);
    }
  }, [journeyData, getJournies]);

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
      <DataTable data={journeyData} columns={columnJourney} view={"journey"}  />
    </div>
  );
};

export default LearningJourney;
