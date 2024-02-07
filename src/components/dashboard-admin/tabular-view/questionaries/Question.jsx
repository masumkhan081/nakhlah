"use client";
import DataTable from "../../table/DataTable";
import ColQuestion from "../../table/ColQuestion";
import {
  useLoadingState,
  useQueType,
  useQuestion,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableQuetions } from "@/lib/fetchFunctions";

const Question = () => {
  const questionData = useQuestion((state) => state.data);
  const setQuestions = useQuestion((state) => state.setQuestions);
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  const currentView = useTabularView((state) => state.data.currentView);

  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await getHandler("question-type");
  //     if (response.status === 200) {
  //       setQueTypes(renderableQueType(response.data.data));
  //     }
  //   };
  //   if (Array.isArray(queTypeData) && queTypeData.length === 0) {
  //     fetch();
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const response = await getHandler(currentSubView);
  //     toggleLoading(false);
  //     if (response.status === 200) {
  //       setQuestions(renderableQuetions(response.data.data));
  //     }
  //   };
  //   if (
  //     loading == false &&
  //     Array.isArray(questionData) &&
  //     questionData.length === 0
  //   ) {
  //     toggleLoading(true);
  //     fetchQuestions();
  //   }
  // }, []);
  

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

export default Question;
