"use client";
import DataTable from "../../table/DataTable";
import ColQuestion from "../../table/ColQuestion";
import { useLoadingState, useQuestion, useTabularView } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import { renderableQuetions } from "@/lib/fetchFunctions";

export default function SM(){
    //
    const questionData = useQuestion((state) => state.data);
    const setQuestions = useQuestion((state) => state.setQuestions);
    //
    const currentSubView = useTabularView((state) => state.data.currentSubView);
    // 
    const selectedJourney = useQuestion((state) => state.selectedJourney);
    const selectedUnit = useQuestion((state) => state.selectedUnit);
    const selectedLevel = useQuestion((state) => state.selectedLevel);
    const selectedLesson = useQuestion((state) => state.selectedLesson);
    //
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
    //
    useEffect(() => {
      const fetchQuestions = async () => {
        let url =
          "api/journey-map-question-contents?populate[question_content][populate]=*";
        if (currentSubView?.id) {
          url += `&filters[question_content][question_type][title][$eq]=${currentSubView.title}`;
          url +=
            "&populate[learning_journey_lesson][populate][learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey";
        }
        if (selectedJourney.id) {
          url += `&filters[learning_journey_lesson][learning_journey_level][learning_journey_unit][learning_journey][id][$eq]=${selectedJourney.id}`;
        }
        if (selectedUnit.id) {
          url += `&filters[learning_journey_lesson][learning_journey_level][learning_journey_unit][id][$eq]=${selectedUnit.id}`;
        }
        if (selectedLevel.id) {
          url += `&filters[learning_journey_lesson][learning_journey_level][id][$eq]=${selectedLevel.id}`;
        }
        if (selectedLesson.id) {
          url += `&filters[learning_journey_lesson][id][$eq]=${selectedLesson.id}`;
        }
  
        const response = await getWithUrl(url);
        toggleLoading(false);
        if (response.status === 200) {
          setQuestions(renderableQuetions(response.data.data));
        }
      };
      if (loading == false) {
        toggleLoading(true);
        fetchQuestions();
      }
    }, [
      currentSubView,
      selectedJourney,
      selectedUnit,
      selectedLevel,
      selectedLesson,
    ]);

  return (
    <div className="w-full bg-white rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={questionData}
          columns={ColQuestion}
          view={"question"}
          filter={"Questions"}
        />
      )}
    </div>
  );
};

 
