"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import {
  useLearningJourney,
  useLoadingState,
} from "../../../../store/useAdminStore";
import columnJourney from "../../table/ColJourney";
import { Skeleton } from "@/components/ui/skeleton";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableJournies } from "@/lib/fetchFunctions";

export default function LearningLevels() {
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
     toggleLoading(false);
      
      if (response.status === 200) {
        setJournies(renderableJournies(response.data.data));
        toggleLoading(false);
      }
    };
    if (
      loading == false &&
      Array.isArray(journeyData) &&
      journeyData.length === 0
    ) {
      fetch();
      toggleLoading(true);
    }
  }, [journeyData]);

  return (
    <div className="w-full bg-white  rounded-xl   ">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={journeyData}
          columns={columnJourney}
          view={"learning-journey"}
        />
      )}
    </div>
  );
}
