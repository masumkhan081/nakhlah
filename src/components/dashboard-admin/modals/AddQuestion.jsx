"use client";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
} from "../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import QueConOption from "../tabular-view/QueConOption";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import { Just_Another_Hand } from "next/font/google";

export default function AddQuestion({ rowData, useForEdit }) {
  const { toast } = useToast();
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
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  //  question-type
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setQueTypes(data);
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    }
  }, [queTypeData]);

  //
  const conTypeCatagories = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  const [selectedConCategory, setSelectedConCategory] = useState(
    useForEdit
      ? {
          id: rowData.content_type_category.id,
          title: rowData.content_type_category.title,
        }
      : initStateSelection
  );
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type-category");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypeCategories(data);
      }
    };
    if (Array.isArray(conTypeCatagories) && conTypeCatagories.length === 0) {
      fetch();
    }
  }, [conTypeCatagories]);
  //

  const contentTypes = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  const [selectedConType, setSelectedConType] = useState(
    useForEdit
      ? {
          id: rowData.content_type.id,
          title: rowData.content_type.title,
        }
      : initStateSelection
  );
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypes(data);
      }
    };
    if (Array.isArray(contentTypes) && contentTypes.length === 0) {
      fetch();
    }
  }, [contentTypes]);
  //
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  // const [selectedContent, setSelectedContent] = useState(
  //   useForEdit
  //     ? {
  //         id: rowData.content.id,
  //         title: rowData.content.title,
  //       }
  //     : initStateSelection
  // );
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content");

      if (response.status === 200) {
        const contentData = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes?.title,
            content_type: {
              id: item.attributes?.content_type?.data.id,
              title: item.attributes?.content_type?.data?.attributes?.title,
            },
            content_type_category: {
              id: item.attributes?.content_type_category?.data?.id,
              title:
                item.attributes?.content_type_category?.data?.attributes?.title,
            },
          };
        });
        setContents(contentData);
      }
    };
    if (Array.isArray(contents) && contents.length === 0) {
      fetch();
    }
  }, [contents]);

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
        alert("rightAndwrong : " + JSON.stringify(rightAndWrong));
        alert("wrongAns : " + JSON.stringify(wrongAns));
        alert("rightAns : " + JSON.stringify(rightAns));
        alert("options: " + JSON.stringify(options));

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
        alert(
          "queOptResult: " +
            JSON.stringify({
              question_content: { connect: [queContResult.data.data.id] },
              content: {
                connect: [
                  options[wrongAns[0]].content.id,
                  options[wrongAns[1]].content.id,
                  options[wrongAns[2]].content.id,
                ],
              },
            })
        );

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

        alert("queOptionResult: " + JSON.stringify(queOptionResult));

        // const data = {
        //   id: queResult.data.data.id,
        //   question: queResult.data.data.attributes.question,
        // };
        // useForEdit ? afterUpdate(data) : afterAdd(data);
        // toast({
        //   title: queResult.message,
        // });

        document.getElementById("closeDialog")?.click();
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
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  const [addNewState, setAddNewState] = useState("");
  function handleAdd() {}

  //  -------------------------------------------------------------- journey portion
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_level.learning_journey_unit
            .learning_journey.id,
          title:
            rowData.learning_journey_level.learning_journey_unit
              .learning_journey.title,
        }
      : initStateSelection
  );
  useEffect(() => {
    const fetchJournies = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setJournies(dataRenderable);
      }
    };

    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetchJournies();
    }
  }, [journeyData]);
  useEffect(() => {
    if (selectedJourney.id != null) {
      setSelectedUnit(initStateSelection);
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
          id: rowData.learning_journey_level.learning_journey_unit.id,
          title: rowData.learning_journey_level.learning_journey_unit.title,
        }
      : initStateSelection
  );
  useEffect(() => {
    const fetchUnits = async () => {
      const response = await getHandler("learning-unit");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey } = item.attributes;

          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey: {
              id: learning_journey.data.id,
              title: learning_journey.data.attributes.title,
            },
          };
        });
        setUnits(data);
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetchUnits();
    }
  }, [unitData]);
  useEffect(() => {
    if (selectedUnit.id != null) {
      setSelectedLevel(initStateSelection);
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
          id: rowData.learning_journey_level.id,
          title: rowData.learning_journey_level.title,
        }
      : initStateSelection
  );
  useEffect(() => {
    const fetchLevels = async () => {
      const response = await getHandler("learning-level");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey_unit } = item.attributes;
          const { learning_journey } = learning_journey_unit.data.attributes;
          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey_unit: {
              id: learning_journey_unit.data.id,
              title: learning_journey_unit.data.attributes.title,
              learning_journey: {
                id: learning_journey.data.id,
                title: learning_journey.data.attributes.title,
              },
            },
          };
        });
        setLevels(data);
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetchLevels();
    }
  }, [levelData]);
  useEffect(() => {
    if (selectedLevel.id != null) {
      setSelectedLesson(initStateSelection);
      filterLessonsByLevel(selectedLevel.id);
    }
  }, [selectedLevel]);
  //
  //  -------------------------------------------------------------- Task Lesson Portion
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);
  const [selectedLesson, setSelectedLesson] = useState(initStateSelection);
  function filterLessonsByLevel(id) {
    setFilteredLessons(
      lessonData.filter((item) => item.learning_journey_level.id == id)
    );
  }
  const [filteredLessons, setFilteredLessons] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      console.log(response.data);
      if (response.status === 200) {
        const data = response?.data?.data
          ?.filter((theData) => {
            // alert("data :: " + JSON.stringify(theData));
            return theData != null;
          })
          .map((item) => {
            const learning_journey_level =
              item?.attributes?.learning_journey_level;

            const learning_journey_unit =
              learning_journey_level?.data?.attributes?.learning_journey_unit;
            const learning_journey =
              learning_journey_unit?.data?.attributes?.learning_journey;

            return {
              id: item.id,
              title: item.attributes?.title,
              learning_journey_level: {
                id: learning_journey_level?.data?.id,
                title: learning_journey_level?.data?.attributes?.title,
                learning_journey_unit: {
                  id: learning_journey_unit?.data?.id,
                  title: learning_journey_unit?.data?.attributes?.title,
                  learning_journey: {
                    id: learning_journey?.data?.id,
                    title: learning_journey?.data?.attributes?.title,
                  },
                },
              },
            };
          });
        setLessons(data);
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);

  const initOptionData = {
    category: initStateSelection,
    type: initStateSelection,
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

  return (
    <>
      <DialogHeader className="overflow-y-scroll  ">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
          Start from top to {useForEdit ? "update" : "add"} question
        </DialogDescription> */}
        <div className="overflow-y-scroll h-[400px] pr-3 w-full ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 py-2 text-black text-lg"
          >
            <EnhancedText kind={"three"} color="text-blue-400 font-normal ">
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

            <EnhancedText kind={"three"} color="text-blue-400 font-normal ">
              Set The Question
            </EnhancedText>
            <div className="flex flex-col gap-1">
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
              <div className="flex flex-col ">
                <label className=" ">Question</label>
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

            <EnhancedText kind={"three"} color="text-blue-400 font-normal ">
              Set Answer Options
            </EnhancedText>

            <div className="flex flex-col gap-4">
              {/* option -1 */}

              {Object.keys(options).map((option, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-3 font-mono text-sm rounded-md border border-slate-400 py-2 px-2  "
                  >
                    <div className="flex justify-between border-b border-blue-300 pb-1">
                      <p className="flex justify-between text-base bg-blue-100 rounded-full h-1.5 font-semibold">
                        <span className="px-2">Answer Option</span>
                        <span className="px-1 h-full rounded-full bg-blue-300 font-bold">
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
                      value={options[option].category}
                      label="Content Type Category"
                      options={conTypeCatagories}
                      onChange={(selected) =>
                        setOptions({
                          ...options,
                          [option]: { ...options[option], category: selected },
                        })
                      }
                      addNewText="New Content Type Category"
                      addNewAfterClick={handleAdd}
                      bg="wh"
                    />
                    <CustomSelect
                      value={options[option].type}
                      label="Content Type"
                      options={contentTypes}
                      onChange={(selected) =>
                        setOptions({
                          ...options,
                          [option]: { ...options[option], type: selected },
                        })
                      }
                      addNewText="New Content Type"
                      addNewAfterClick={handleAdd}
                      bg="wh"
                    />
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

            <div className="sticky bottom-0 bg-white py-1 w-full ">
              <CustomButton
                txt="Submit"
                type="submit"
                style="text-base w-full mt-2 py-0.12 h-fit font-semibold text-blue-900 bg-blue-200 leading-1"
              />
            </div>
          </form>
        </div>
      </DialogHeader>
    </>
  );
}
