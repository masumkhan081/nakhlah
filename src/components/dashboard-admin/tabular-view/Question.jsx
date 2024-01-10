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
        alert(JSON.stringify(response.data.data));
        const data = response.data.data.map((item) => {
          //
          const { question } = item.attributes.question_content.data.attributes;
          const { question_type } =
            item.attributes.question_content.data.attributes;
          const { learning_journey_lesson } = item.attributes;
          const { learning_journey_level } =
            learning_journey_lesson.data.attributes;
          const { learning_journey_unit } =
            learning_journey_level.data.attributes;
          const { learning_journey } = learning_journey_unit.data.attributes;
          //
          return {
            id: item.id,
            question: question.data?.attributes?.question,
            question_type: question_type?.data?.attributes?.title,
            lesson: {
              id: learning_journey_lesson.data.id,
              title: learning_journey_lesson.data.attributes.title,
            },
            task_unit: {
              id: learning_journey_level.data.id,
              title: learning_journey_level.data.attributes.title,
            },
            task: {
              id: learning_journey_unit.data.id,
              title: learning_journey_unit.data.attributes.title,
            },
            level: {
              id: learning_journey.data.id,
              title: learning_journey.data.attributes.title,
            },
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
    <div className="w-full bg-white rounded-xl">
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
