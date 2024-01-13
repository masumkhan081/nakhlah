"use client";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  useLearningJourney,
  useConType,
  useConTypeCategory,
  useContent,
  useQueType,
  useQuestion,
  useTabularView,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
} from "../../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import {
  renderableContTypeCategories,
  renderableContTypes,
  renderableContents,
  renderableLearningLevels,
  renderableLessons,
  renderableQueType,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";

export default function AddQuePage({ rowData, useForEdit }) {
  const { toast } = useToast();
  //

  //
  const initStateSelection = {
    id: null,
    title: "",
  };
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");

  const [error, setError] = useState({
    err0: "",
  });
  //
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData.question_type.id,
          title: rowData.question_type.title,
        }
      : initStateSelection
  );
  //  question-type

  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  //  -------------------------------------------------------------- journey portion
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.level.id,
          title: rowData.level.title,
        }
      : initStateSelection
  );

  useEffect(() => {
    if (selectedJourney.id != null) {
      useForEdit ? "" : setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);
  //
  //  -------------------------------------------------------------- Task Unit Portion
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.task.id,
          title: rowData.task.title,
        }
      : initStateSelection
  );

  useEffect(() => {
    if (selectedUnit.id != null) {
      useForEdit ? "" : setSelectedLevel(initStateSelection);
      filterLevelsByUnit(selectedUnit.id);
    }
  }, [selectedUnit]);
  //
  //  -------------------------------------------------------------- Task Level Portion
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  function filterLevelsByUnit(id) {
    setFilteredLevels(
      levelData.filter((item) => item.learning_journey_unit.id == id)
    );
  }
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.task_unit.id,
          title: rowData.task_unit.title,
        }
      : initStateSelection
  );

  useEffect(() => {
    if (selectedLevel.id != null) {
      useForEdit ? "" : setSelectedLesson(initStateSelection);
      filterLessonsByLevel(selectedLevel.id);
    }
  }, [selectedLevel]);
  //
  //  -------------------------------------------------------------- Task Lesson Portion
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);
  const [selectedLesson, setSelectedLesson] = useState(
    useForEdit
      ? {
          id: rowData.lesson.id,
          title: rowData.lesson.title,
        }
      : initStateSelection
  );
  function filterLessonsByLevel(id) {
    setFilteredLessons(
      lessonData.filter((item) => item.learning_journey_level.id == id)
    );
  }
  const [filteredLessons, setFilteredLessons] = useState([]);

  function handleAdd() {}
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      console.log(response.data);
      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    }
  }, [queTypeData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content");
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
      }
    };
    if (Array.isArray(contents) && contents.length === 0) {
      fetch();
    }
  }, [contents]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        setJournies(renderableLearningLevels(response.data.data));
      }
    };
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetch();
    }
  }, [journeyData]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");
      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetch();
    }
  }, [unitData]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetch();
    }
  }, [levelData]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);

  const initOptionData = {
    // category: initStateSelection,
    // type: initStateSelection,
    content: initStateSelection,
  };
  const initRightWrong = {
    optionOne: false,
    optionTwo: false,
    optionThree: false,
    optionFour: false,
  };

  const [options, setOptions] = useState({
    optionOne: initOptionData,
    optionTwo: initOptionData,
    optionThree: initOptionData,
    optionFour: initOptionData,
  });

  const [rightAndWrong, setRightAndWrong] = useState(initRightWrong);

  function handleMark(obj) {
    setRightAndWrong({ ...initRightWrong, ...obj });
  }
  //   hs()
  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    let err_5 = "";
    let err_6 = "";

    let rightAns = Object.keys(rightAndWrong).find(
      (item) => rightAndWrong[item] == true
    );
    let wrongAns = Object.keys(rightAndWrong).filter(
      (item) => rightAndWrong[item] == false
    );

    if (
      question.length > 2 &&
      selectedLesson.id &&
      wrongAns.length == 3 &&
      rightAns
    ) {
      const queResult = useForEdit
        ? await putHandler("question", rowData.id, {
            data: { question: question },
          })
        : await postHandler("question", {
            data: { question: question },
          });
      if (queResult.status == 200) {
        const queContResult = useForEdit
          ? await putHandler("question-content", rowData.id, {
              data: {},
            })
          : await postHandler("question-content", {
              data: {
                question: { connect: [queResult.data.data.id] },
                question_type: { connect: [selectedQueType.id] },
                content: { connect: [options[rightAns].content.id] },
              },
            });

        const queOptionResult = useForEdit
          ? await putHandler("question-content-option", rowData.id, {
              data: {},
            })
          : await postHandler("question-content-option", {
              data: {
                question_content: { connect: [queContResult.data.data.id] },
                content: {
                  connect: [
                    options[wrongAns[0]].content.id,
                    options[wrongAns[1]].content.id,
                    options[wrongAns[2]].content.id,
                  ],
                },
              },
            });

        if (queOptionResult.status == 200) {
          const journeyMapResult = useForEdit
            ? await putHandler("journey-map-question", rowData.id, {
                data: {},
              })
            : await postHandler("journey-map-question", {
                data: {
                  learning_journey_lesson: { connect: [selectedLesson.id] },
                  question_content: { connect: [queContResult.data.data.id] },
                },
              });
          if (journeyMapResult.status == 200) {
            toast({
              title: "Question Added Successfully",
            });
          }
        }

        useForEdit
          ? afterUpdate(data)
          : afterAdd({
              id: queResult.data.data.id,
              question: question,
              question_type: {
                id: selectedQueType.id,
                title: selectedQueType.title,
              },

              lesson: {
                id: selectedLesson.id,
                title: selectedLesson.title,
              },
              task_unit: {
                id: selectedLevel.id,
                title: selectedLevel.title,
              },
              task: {
                id: selectedUnit.id,
                title: selectedUnit.title,
              },
              level: {
                id: selectedJourney.id,
                title: selectedJourney.title,
              },
            });

        // document.getElementById("closeDialog")?.click();
      } else if (queResult.status == 400) {
        setError({ err0: queResult.error });
      }
    }
    //  specific errors
    else {
      if (selectedLesson.id == null) {
        err_0 = "Select A Lesson";
      }
      if (selectedQueType.id == null) {
        err_1 = "Select Question Type";
      }
      if (question.length < 3) {
        err_2 = "Too Short";
      }

      setError({
        err0: err_0,
        err1: err_1,
        err2: err_2,
        err4: err_4,
        err5: err_5,
        err6: err_6,
      });
    }
  }

  const [tFAns, setTFAns] = useState(initStateSelection);
  const trueFalseOptions = [
    { id: 1, title: "False" },
    { id: 2, title: "True " },
  ];

  //   jsx
  return (
    <div className="w-full p-3 border border-blue-300 rounded-md ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 py-2 text-black text-sm font-mono"
      >
        <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
          Select Learning Lesson
        </EnhancedText>
        <div className="flex flex-col gap-2 ">
          <CustomSelect
            label={"Learner Level"}
            value={selectedJourney}
            options={journeyData}
            bg="wh"
            onChange={(value) =>
              setSelectedJourney({ id: value.id, title: value.title })
            }
          />
          <CustomSelect
            label={"Task"}
            value={selectedUnit}
            options={filteredUnits}
            bg="wh"
            onChange={(value) =>
              setSelectedUnit({ id: value.id, title: value.title })
            }
          />

          <CustomSelect
            label={"Task level"}
            value={selectedLevel}
            options={filteredLevels}
            bg="wh"
            onChange={(value) =>
              setSelectedLevel({ id: value.id, title: value.title })
            }
          />

          <CustomSelect
            label={"Task Lesson"}
            value={selectedLesson}
            options={filteredLessons}
            bg="wh"
            onChange={(value) =>
              setSelectedLesson({ id: value.id, title: value.title })
            }
          />
          {error.err0 !== "" && (
            <span className="text-red-700">{error.err0}</span>
          )}
        </div>

        <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
          Set The Question
        </EnhancedText>
        <div className="flex flex-col gap-2 rounded-md border-l-2 border-blue-400 py-3 px-2">
          <div className="flex flex-col gap-1">
            <CustomSelect
              label={"Select Question Type"}
              value={selectedQueType}
              options={queTypeData}
              bg="wh"
              onChange={(value) =>
                setSelectedQueType({ id: value.id, title: value.title })
              }
            />
            {error.err1 !== "" && (
              <span className="text-red-700">{error.err1}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 ">
            <span className="">Question</span>
            <CustomInput
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              ph="Enter the question"
              style="py-0.12 px-1"
            />
            <span className="text-red-700">{error.err2}</span>
          </div>
        </div>

        <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
          Set Answer Options
        </EnhancedText>

        <div className="flex flex-col gap-4 border-blue-400">
          {/* option -1 */}

          {selectedQueType.title == "True 0r False" && (
            <div className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  ">
              <div className="flex justify-between   pb-1">
                <p className="flex justify-between bg-blue-100 rounded-full h-[1.2rem]  ">
                  <span className="px-2">Select Correct Option</span>
                </p>
              </div>

              <CustomSelect
                label={"(true/false)"}
                value={tFAns}
                options={trueFalseOptions}
                onChange={(selected) => setTFAns(selected)}
                bg="wh"
              />
            </div>
          )}

          {(selectedQueType.title == "MCQ" ||
            selectedQueType.title == "Fill in the blank") &&
            Object.keys(options).map((option, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  "
                >
                  <div className="flex justify-between   pb-1">
                    <p className="flex justify-between bg-blue-100 rounded-full h-[1.2rem]  ">
                      <span className="px-2">Answer Option</span>
                      <span className="px-1 h-full rounded-full bg-blue-200 font-semibold">
                        {index + 1}
                      </span>
                    </p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        id={option}
                        checked={rightAndWrong[option]}
                        name={"ans_option"}
                        onChange={(e) =>
                          handleMark({ [option]: e.target.checked })
                        }
                      />
                      <label htmlFor="option1" className="text-sm">
                        Mark as right answer
                      </label>
                    </div>
                  </div>

                  <CustomSelect
                    value={options[option].content}
                    label="Content"
                    options={contents}
                    onChange={(selected) =>
                      setOptions({
                        ...options,
                        [option]: { ...options[option], content: selected },
                      })
                    }
                    addNewText="New Content"
                    addNewAfterClick={handleAdd}
                    bg="wh"
                  />
                </div>
              );
            })}
        </div>

        <div className="sticky bottom-0 bg-white w-full ">
          <CustomButton
            txt="Submit"
            type="submit"
            style="text-lg w-full my-1 shadow-sm  py-0.12 h-fit font-semibold text-blue-900 bg-blue-200 leading-1"
          />
        </div>
      </form>
    </div>
  );
}
