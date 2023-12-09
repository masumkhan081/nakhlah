import React, { useState } from "react";
import {
  useLearningJourney,
  useLearningUnit,
  useLearningLevel,
  useLearningLesson,
  useQueType,
  useConType,
  useConTypeCategory,
  useLearnerPurpose,
  useLearnerLevel,
  useLearnerStartPoint,
  useLearnerGoal,
} from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import CustomButton from "../../ui-custom/CustomButton";
import { deleteHandler } from "@/lib/requestHandler";
import { useToast } from "@/components/ui/use-toast";

export default function Deletion({ rowData, what }) {
  const { toast } = useToast();

  const [error, setError] = useState("");

  const afterDelete = {
    "learner-purpose": useLearnerPurpose((state) => state.afterDelete),
    "learner-goal": useLearnerGoal((state) => state.afterDelete),
    "learner-start-point": useLearnerStartPoint((state) => state.afterDelete),
    "learner-level": useLearnerLevel((state) => state.afterDelete),
    "question-type": useQueType((state) => state.afterDelete),
    "content-type": useConType((state) => state.afterDelete),
    "content-type-category": useConTypeCategory((state) => state.afterDelete),
    "learning-journey": useLearningJourney((state) => state.afterDelete),
    "learning-unit": useLearningUnit((state) => state.afterDelete),
    "learning-level": useLearningLevel((state) => state.afterDelete),
    "learning-lesson": useLearningLesson((state) => state.afterDelete),
  };
  // learning-journey
  // const afterDeleteJourney = useLearningJourney((state) => state.afterDelete);
  // const afterDeleteLearningUnit = useLearningUnit((state) => state.afterDelete);
  // const afterDeleteLearningLevel = useLearningLevel(
  //   (state) => state.afterDelete
  // );
  // const afterDeleteLearningLesson = useLearningLesson((state) => state.afterDelete);
  // questionaries
  // const afterDeleteQueType = useQueType((state) => state.afterDelete);
  // const afterDeleteConType = useConType((state) => state.afterDelete);
  // const afterDeleteConTypeCategory = useConTypeCategory(
  //   (state) => state.afterDelete
  // );
  // user-profile
  // const afterDeletePurpose = useLearnerPurpose((state) => state.afterDelete);
  // const afterDeleteLearnerlevel = useLearnerlevel((state) => state.afterDelete);
  // const afterDeleteStartPoint = useLearnerStartPoint(
  //   (state) => state.afterDelete
  // );
  // const afterDeleteGoal = useLearnerGoal((state) => state.afterDelete);

  function onSuccess() {
    document.getElementById("closeDialog")?.click();
    toast({
      title: "Deleted successfully",
    });
  }

  function handleDeletion() {
    deleteHandler({ key: what, id: rowData.id })
      .then((response) => {
        afterDelete[what](rowData.id);
        onSuccess();
      })
      .catch((err) => {
        setError("Error in deleion");
      });
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      <p className="text-center">
        You are deleting the{" "}
        <span className="capitalize underline">{what}:</span>
        <span className="underline font-bold py-0.5 ms-2">{rowData.title}</span>
      </p>
      <p className="text-center text-lg font-bold text-orange-700 drop-shadow-sm">
        Confirm To Delete ?
      </p>
      <CustomButton click={handleDeletion} txt="Delete" />
      <p className="text-red-600 font-semibold text-center">{error}</p>
    </div>
  );
}
