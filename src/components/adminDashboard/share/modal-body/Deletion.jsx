import React from "react";
import {
  useJourney,
  useTaskUnit,
  useLevel,
  useLesson,
} from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/share/CustomButton";

export default function Deletion({ rowData, what }) {
  const removeJourney = useJourney((state) => state.removeStatic);
  const removeTask = useTaskUnit((state) => state.removeStatic);
  const removeLevel = useLevel((state) => state.removeStatic);
  const removeLesson = useLesson((state) => state.removeStatic);

  function handleDeletion() {
    switch (what) {
      case "journey":
        removeJourney(rowData.id);
        break;
      case "task":
        removeTask(rowData.id);
        break;
      case "level":
        removeLevel(rowData.id);
        break;
      case "lesson":
        removeLesson(rowData.id);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">
        You are deleting the <span className="capitalize">{what}:</span>
        <span className="underline font-bold py-0.5 ms-2">{rowData.title}</span>
      </p>
      <p className="text-center text-lg font-bold text-orange-700 drop-shadow-sm">
        Confirm To Delete ?
      </p>

      <CustomButton click={handleDeletion} txt="Delete" />
    </div>
  );
}
