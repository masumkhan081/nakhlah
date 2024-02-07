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
import {
  getHandler,
  getWithUrl,
  postHandler,
  postMap,
  putHandler,
  putMap,
} from "@/lib/requestHandler";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import {
  renderableContTypeCategories,
  renderableContTypes,
  renderableContents,
  renderableJournies,
  renderableLessons,
  renderableQueType,
  renderableLevels,
  renderableTasks,
  renderableOptions,
} from "@/lib/fetchFunctions";
import { GitCommitHorizontal, Hash } from "lucide-react";
import axios from "axios";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AddTOF({ rowData, useForEdit }) {
  const { toast } = useToast();
  //
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  //
  const journeyDataQue = useQuestion((state) => state.journeyDataQue);
  const unitDataQue = useQuestion((state) => state.unitDataQue);
  const levelDataQue = useQuestion((state) => state.levelDataQue);
  const lessonDataQue = useQuestion((state) => state.lessonDataQue);
  //
  const setJourneyDataQue = useQuestion((state) => state.setJourneyDataQue);
  const setUnitDataQue = useQuestion((state) => state.setUnitDataQue);
  const setLevelDataQue = useQuestion((state) => state.setLevelDataQue);
  const setLessonDataQue = useQuestion((state) => state.setLessonDataQue);
  //
  const selectedQueLesson = useQuestion((state) => state.selectedLesson);
  const selectedQueJourney = useQuestion((state) => state.selectedJourney);
  const selectedQueUnit = useQuestion((state) => state.selectedUnit);
  const selectedQueLevel = useQuestion((state) => state.selectedLevel);
  //
  const setContents = useContent((state) => state.setContents);
  const contents = useContent((state) => state.data);
  //
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);
  //
  const initStateSelection = {
    id: null,
    title: "",
  };

  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.level.id,
          title: rowData.level.title,
        }
      : selectedQueJourney
  ); // { id: 3, title: "Advanced" }

  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.task.id,
          title: rowData.task.title,
        }
      : selectedQueUnit //{ id: 9, title: "Pokath" }
  );
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.task_unit.id,
          title: rowData.task_unit.title,
        }
      : selectedQueLevel // { id: 7, title: "Level adv pokath" }
  );
  const [selectedLesson, setSelectedLesson] = useState(
    useForEdit
      ? {
          id: rowData.lesson.id,
          title: rowData.lesson.title,
        }
      : selectedQueLesson // { id: 8, title: "Lesson 2" }
  );

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        setJourneyDataQue(renderableOptions(response.data.data));
      }
    };
    if (Array.isArray(journeyDataQue) && journeyDataQue.length === 0) {
      fetch();
    }
  }, [journeyDataQue]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getWithUrl(
        `api/learning-journey-units?populate=*&filters[learning_journey][title][$eq]=${selectedJourney.title}`
      );

      if (response.status === 200) {
        setUnitDataQue(renderableOptions(response.data.data));
      }
    };
    fetch();
  }, [selectedJourney]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getWithUrl(
        `api/learning-journey-levels?filters[learning_journey_unit][learning_journey][title][$eq]=${selectedJourney.title}&filters[learning_journey_unit][title][$eq]=${selectedUnit.title}&populate[learning_journey_unit][populate][0]=learning_journey`
      );
      if (response.status === 200) {
        setLevelDataQue(renderableOptions(response.data.data));
      }
    };
    fetch();
  }, [selectedUnit]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getWithUrl(
        `api/learning-journey-lessons?filters[learning_journey_level][learning_journey_unit][learning_journey][title][$eq]=${selectedJourney.title}&filters[learning_journey_level][learning_journey_unit][title][$eq]=${selectedUnit.title}&filters[learning_journey_level][title][$eq]=${selectedLevel.title}&populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`
      );
      if (response.status === 200) {
        setLessonDataQue(renderableOptions(response.data.data));
      }
    };
    fetch();
  }, [selectedLevel]);

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");

  const initErrors = {
    err0: "",
  };
  const [error, setError] = useState(initErrors);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-tof");
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
      }
    };
    fetch();
  }, []);

  const initOptionData = {
    content: initStateSelection,
  };

  //   hs()
  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";

    if (tFAns.id != null) {
      //
      let formData = new FormData();
      var fileInput = document.getElementById("idInputFile");
      var file = fileInput.files[0];
      formData.append("files.image", file);

      let obj = {
        question: question,
        question_type: { connect: [currentSubView.id] },
      };
      let obj2 = {
        question: question,
        question_type: { connect: [currentSubView.id] },
        audio: queAudio,
      };

      formData.append(
        "data",
        queAudio.length > 0 ? JSON.stringify(obj2) : JSON.stringify(obj)
      );

      try {
        const queResult = await axios.post(
          "https://api.nakhlah.xyz/api/questions?populate=image",
          formData,
          {
            headers: {
              Authorization:
                "Bearer " +
                "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef",
            },
          }
        );
        alert("queResult: " + JSON.stringify(queResult));
        if (queResult?.data?.data?.id) {
          const queContResult = useForEdit
            ? await putHandler("question-content", rowData.id, {
                data: {},
              })
            : await postHandler("question-content", {
                data: {
                  question: { connect: [queResult.data.data.id] },
                  question_type: { connect: [currentSubView.id] },
                  content: { connect: [tFAns.id] },
                },
              });

          alert("queContResult: " + JSON.stringify(queContResult));
          if (queContResult.status == 200) {
            const journeyMapResult = useForEdit
              ? await putHandler("journey-map-question", rowData.id, {
                  data: {
                    learning_journey_lesson: { connect: [selectedLesson.id] },
                    question_content: {
                      connect: [queContResult.data.data.id],
                    },
                  },
                })
              : await postHandler("journey-map-question", {
                  data: {
                    learning_journey_lesson: { connect: [selectedLesson.id] },
                    question_content: {
                      connect: [queContResult.data.data.id],
                    },
                  },
                });
            if (journeyMapResult.status == 200) {
              useForEdit
                ? afterUpdate(data)
                : afterAdd({
                    id: queResult.data.data.id,
                    question: question,
                    audio: queAudio,
                    question_type: {
                      id: currentSubView.id,
                      title: currentSubView.title,
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
              toast({
                title: useForEdit
                  ? "Item Updated Succesfully"
                  : "Item Added Successfully",
              });
              resetForm();
            }
            alert("journeyMapResult: " + JSON.stringify(journeyMapResult));
          }
        } else if (queResult.status == 400) {
          let errors = queResult.data.error.details.errors;
          alert("errors: " + JSON.stringify(errors));
          setError({
            err2: errors[0]?.message,
          });
        }
      } catch (error) {
        alert(JSON.stringify(error.response.data)); // NOTE - use "error.response.data` (not "error")
      }
    } else {
      if (selectedLesson.id == null) {
        err_0 = "Select A Lesson";
      }

      if (question.length < 3) {
        err_2 = "Question Too Short";
      }
      if (tFAns.id == null) {
        err_3 = "Must Provide A Correct Option";
      }
      setError({
        err0: err_0,
        err1: err_1,
        err2: err_2,
        err3: err_3,
      });
    }
  }

  function resetForm() {
    setTFAns(initStateSelection);
    setQuestion("");
    setError(initErrors);
    setQueAudio("");
    setImage("");
  }

  const [tFAns, setTFAns] = useState(initStateSelection);

  const [image, setImage] = useState(null);
  const [queAudio, setQueAudio] = useState("");

  //   jsx
  return (
    <DialogHeader className=" h-fit  ">
      <DialogTitle className="textHeader textPrimaryColor ">
        {useForEdit ? "Update Question" : "New Question"}
        <span className="ms-2 font-normal text-sm font-mono text-blue-500">
          {currentSubView.title.replaceAll("_", " ")}
        </span>
      </DialogTitle>
      <div className="w-full p-3   rounded-md  overflow-y-auto h-[400px] max-h-[400px]">
        {/* {JSON.stringify(tFAns)} */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 py-2 text-black text-sm font-mono"
        >
          {/* sll select learning lesson */}
          <div className="flex flex-col gap-3 rounded-sm   py-0.75 px-2">
            <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
              <GitCommitHorizontal className="w-6 h-6 text-blue-500" /> Select
              Learning Lesson
            </EnhancedText>
            <div className="flex flex-col gap-2 ">
              <CustomSelect
                label={"Learning Journey"}
                value={selectedJourney}
                options={journeyDataQue}
                bg="wh"
                onChange={(value) =>
                  setSelectedJourney({ id: value.id, title: value.title })
                }
              />
              <CustomSelect
                label={"Learning Unit"}
                value={selectedUnit}
                options={unitDataQue}
                bg="wh"
                onChange={(value) =>
                  setSelectedUnit({ id: value.id, title: value.title })
                }
              />

              <CustomSelect
                label={"Learning Level"}
                value={selectedLevel}
                options={levelDataQue}
                bg="wh"
                onChange={(value) =>
                  setSelectedLevel({ id: value.id, title: value.title })
                }
              />

              <CustomSelect
                label={"Learning Lesson"}
                value={selectedLesson}
                options={lessonDataQue}
                bg="wh"
                onChange={(value) =>
                  setSelectedLesson({ id: value.id, title: value.title })
                }
              />
              {/* {error.err0 !== "" && (
              <span className="text-red-700">{error.err0}</span>
            )} */}
            </div>
          </div>

          {/* stq Set the question */}

          <div className="flex flex-col gap-3 rounded-sm    py-0.75 px-2">
            <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
              <GitCommitHorizontal className="w-6 h-6 text-blue-400" /> Set The
              Question ({currentSubView?.title})
            </EnhancedText>
            <div className="flex flex-col gap-1 ">
              {/* {error.err1 !== "" && (
              <span className="text-red-700">{error.err1}</span>
            )} */}
            </div>
            <div className="flex flex-col gap-1   ">
              <span className="">Question</span>
              <CustomInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ph="Enter the question"
                style="py-0.25 px-1"
              />
              {/* <span className="text-red-700">{error.err2}</span> */}
            </div>
            <div className="flex gap-2 flex-col items-start">
              <input
                type="file"
                id="idInputFile"
                name="file"
                onChange={(e) => {
                  let files = e.target.files;
                  let reader = new FileReader();
                  reader.onload = (r) => {
                    setImage(r.target.result);
                  };
                  reader.readAsDataURL(files[0]);
                }}
              />
              {image && (
                <img
                  alt=" image"
                  src={image}
                  className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
                />
              )}
            </div>
            <div className="flex flex-col gap-1    ">
              <span className="">Attach Audio Text</span>
              <textarea
                value={queAudio}
                onChange={(e) => setQueAudio(e.target.value)}
                rows={2}
                className="py-0.12 px-1 rounded-md border border-slate-400 outline-none"
              />

              {/* <span className="text-red-700">{error.err2}</span> */}
            </div>
          </div>
          {/* sao Set answer option */}
          <div className="flex flex-col gap-2 rounded-md    py-0.75 px-2">
            <>
              <div className="flex gap-3 items-center">
                <EnhancedText
                  kind={"four"}
                  color="text-blue-600 font-semibold "
                >
                  <GitCommitHorizontal className="w-6 h-6 text-blue-500" /> Set
                  Answer Options
                </EnhancedText>
                {/* <span className="text-red-600 font-semibold pt-0.12 ">
                  {error.err3}
                </span> */}
              </div>
              <div className="flex flex-col gap-4 border-blue-400">
                {/* option -1 */}

                <div className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  ">
                  <div className="flex justify-between pb-1">
                    <span className="px-2 bg-blue-100 rounded-full h-[1.2rem]">
                      Select Correct Option
                    </span>
                  </div>

                  <CustomSelect
                    label={"(true/false)"}
                    value={tFAns}
                    options={contents}
                    onChange={(selected) => setTFAns(selected)}
                    bg="wh"
                  />
                </div>
              </div>
            </>
          </div>
          <div className="relative px-3   ">
            <div className="sticky bottom-0 bg-white   ">
              <div className="flex flex-col gap-0">
                {error.err0 !== "" && (
                  <span className="text-red-700">{error.err0}</span>
                )}
                {error.err1 !== "" && (
                  <span className="text-red-700">{error.err1}</span>
                )}
                {error.err2 !== "" && (
                  <span className="text-red-700">{error.err2}</span>
                )}
                {error.err3 !== "" && (
                  <span className="text-red-700">{error.err3}</span>
                )}
                {error.err4 !== "" && (
                  <span className="text-red-700">{error.err4}</span>
                )}
              </div>
              <CustomButton
                txt="Submit"
                type="submit"
                style="text-lg w-full my-1 shadow-sm  py-0.12 h-fit font-semibold text-blue-900 bg-blue-200 leading-1"
              />
            </div>
          </div>
        </form>
      </div>
    </DialogHeader>
  );
}
