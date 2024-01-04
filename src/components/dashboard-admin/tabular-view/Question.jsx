"use client";
import DataTable from "../table/DataTable";
import ColQuestion from "../table/ColQuestion";
import { useQuestion } from "../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";

const Question = () => {
  const questionData = useQuestion((state) => state.data);
  const setQuestions = useQuestion((state) => state.setQuestions);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getHandler("question");

      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            question: item.attributes.question,
          };
        });
        setQuestions(data);
      }
    };
    if (Array.isArray(questionData) && questionData.length === 0) {
      fetchQuestions();
    }
  }, [questionData]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {questionData.length != 0 ? (
        <DataTable
          data={questionData}
          columns={ColQuestion}
          view={"question"}
          filter={"Questions"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};

export default Question;
