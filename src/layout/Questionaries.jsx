"use client";
import React, { useEffect, useState } from "react";
import { tabsQuestionaries } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import {
  useConType,
  useLearningJourney,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
  useQueType,
  useQuestion,
  useTabularView,
} from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";

import QueType from "@/components/dashboard-admin/tabular-view/questionaries/QueType";
import ContentType from "@/components/dashboard-admin/tabular-view/questionaries/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/questionaries/ConTypeCategory";
import Content from "@/components/dashboard-admin/tabular-view/questionaries/Content";
import AddQuePage from "@/components/dashboard-admin/modals/questionaries/AddQuePage";
import { ChevronsRight, FileQuestion } from "lucide-react";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import {
  renderableContTypes,
  renderableQueType,
  renderableOptions,
} from "@/lib/fetchFunctions";
import MCQ from "@/components/dashboard-admin/tabular-view/questionaries/MCQ";
import TOF from "@/components/dashboard-admin/tabular-view/questionaries/TOF";
import FITB from "@/components/dashboard-admin/tabular-view/questionaries/FITB";
import PM from "@/components/dashboard-admin/tabular-view/questionaries/PM";
import SM from "@/components/dashboard-admin/tabular-view/questionaries/SM";
import AddMCQ from "@/components/dashboard-admin/modals/questionaries/AddMCQ";
import AddFITB from "@/components/dashboard-admin/modals/questionaries/AddFITB";
import AddTOF from "@/components/dashboard-admin/modals/questionaries/AddTOF";
import AddSM from "@/components/dashboard-admin/modals/questionaries/AddSM";
import AddPM from "@/components/dashboard-admin/modals/questionaries/AddPM";

export default function Questionaries({ content }) {
  //
  const tabularVeiw = useTabularView((state) => state.data);
  const currentView = useTabularView((state) => state.data.currentView);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  const currentAct = useTabularView((state) => state.data.currentAct);

  const setTabularView = useTabularView((state) => state.setTabularView);
  const setSubView = useTabularView((state) => state.setSubView);
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
  const selectedLesson = useQuestion((state) => state.selectedLesson);
  const selectedJourney = useQuestion((state) => state.selectedJourney);
  const selectedUnit = useQuestion((state) => state.selectedUnit);
  const selectedLevel = useQuestion((state) => state.selectedLevel);
  //
  const setSelectedUnit = useQuestion((state) => state.setSelectedUnit);
  const setSelectedLevel = useQuestion((state) => state.setSelectedLevel);
  const setSelectedLesson = useQuestion((state) => state.setSelectedLesson);
  const setSelectedJourney = useQuestion((state) => state.setSelectedJourney);

  const initStateSelection = {
    id: null,
    title: "",
  };

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

  //
  useEffect(() => {
    const fetch = async () => {
      const response = await getWithUrl(
        `api/learning-journey-units?populate=*&filters[learning_journey][title][$eq]=${selectedJourney.title}`
      );

      if (response.status === 200) {
        setUnitDataQue(renderableOptions(response.data.data));
        setSelectedUnit(initStateSelection);
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
        setSelectedLevel(initStateSelection);
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
        setSelectedLesson(initStateSelection);
      }
    };
    fetch();
  }, [selectedLevel]);

  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");

      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
        setTabularView({
          currentPage: "questionaries",
          currentView: tabsQuestionaries[0],
          currentAct: "view",
        });
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    } else {
      setTabularView({
        currentPage: "questionaries",
        currentView: tabsQuestionaries[0],
        currentAct: "view",
      });
    }
  }, []);

  useEffect(() => {
    if (queTypeData.length > 0) {
      setSubView({
        currentSubView: queTypeData[0],
      });
    }
  }, [queTypeData]);

  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type");
      if (response.status === 200) {
        setConTypes(renderableContTypes(response.data.data));
      }
    };
    if (Array.isArray(conTypeData) && conTypeData.length === 0) {
      fetch();
    }
  }, []);

  const active_tab = (btn) =>
    btn === currentView
      ? " bg-slate-200 border-slate-400  shadow-sm"
      : " bg-slate-100 border-slate-200";

  const active_sub_tab = (btn) =>
    btn === currentSubView?.title
      ? " bg-wh font-medium border-slate-800 shadow-sm"
      : "   ";

  return (
    <div className="max-h-[83vh] flex flex-col gap-3 px-2 w-full bg-white">
      <div className=" rounded-md p-1 flex justify-between">
        <EnhancedText kind={"two"} color=" text-slate-800">
          {/* {JSON.stringify(tabularVeiw)} */}
        </EnhancedText>

        {currentView == "Add New Question" && (
          <CustomButton
            click={() => {
              setTabularView({
                currentPage: "questionaries",
                currentView: "Questions",
              });
            }}
            style={
              "text-blue-800 bg-white font-semibold text-sm font-serif leading-3 py-1 hover:bg-slate-100 hover:rounded-full px-1 rounded-sm"
            }
            txt="Back To Questions"
          />
        )}
      </div>

      <div className="flex gap-2 items-center">
        {tabsQuestionaries.map((item, ind) => {
          return (
            <CustomButton
              key={ind}
              txt={item}
              style={`px-2 text-base h-fit py-0.12 flex items-center font-normal font-sans rounded-md hover:bg-slate-100 hover:shadow hover:drop-shadow-sm ${active_tab(
                item
              )}`}
              click={() => {
                setTabularView({
                  currentView: item,
                  currentSubView:
                    item == "Questions"
                      ? queTypeData[0]
                      : item == "Contents"
                      ? conTypeData[0]
                      : "",
                  currentAct: "view",
                });
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-0.4 items-end px-2 mt-0.25">
        {/* journey to lesson */}
        {currentView == "Questions" && (
          <div className="flex gap-1 items-center">
            <CustomSelect2
              label="Journey"
              value={selectedJourney}
              options={journeyDataQue}
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
            <CustomSelect2
              label="Unit"
              value={selectedUnit}
              options={unitDataQue}
              onChange={(value) =>
                setSelectedUnit({ id: value.id, title: value.title })
              }
            />
            <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
            <CustomSelect2
              label="Level"
              value={selectedLevel}
              options={levelDataQue}
              onChange={(value) =>
                setSelectedLevel({ id: value.id, title: value.title })
              }
            />
            <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
            <CustomSelect2
              label="Lesson"
              value={selectedLesson}
              options={lessonDataQue}
              onChange={(value) =>
                setSelectedLesson({ id: value.id, title: value.title })
              }
            />
          </div>
        )}
        <div className="flex gap-2 ">
          {currentView == "Questions" &&
            queTypeData.map((item, ind) => {
              return (
                <CustomButton
                  key={ind}
                  txt={item.title}
                  style={`px-1 text-sm h-fit py-0 font-light tracking-wide font-sans  border-b border-slate-300 rounded-none  hover:border-slate-800 hover:drop-shadow-sm ${active_sub_tab(
                    item.title
                  )}`}
                  click={() => {
                    setTabularView({
                      currentSubView: item,
                      currentAct: "view",
                    });
                  }}
                />
              );
            })}

          {currentView == "Contents" &&
            conTypeData.map((item, ind) => {
              return (
                <CustomButton
                  key={ind}
                  txt={item.title.replaceAll("_", " ")}
                  style={`px-1 text-sm h-fit py-0 font-light tracking-wide font-sans  border-b border-slate-300 rounded-none  hover:border-slate-800 hover:drop-shadow-sm ${active_sub_tab(
                    item.title
                  )}`}
                  click={() => {
                    setTabularView({
                      currentSubView: item,
                      currentAct: "view",
                    });
                  }}
                />
              );
            })}
        </div>
      </div>

      <div className="flex-grow overflow-y-scroll  ">
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView.title == "MCQ" && <MCQ />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView.title == "True Or False" && <TOF />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView.title == "Fill In The Blank" && <FITB />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView.title == "Pair Matching" && <PM />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView.title == "Sentence Making" && <SM />}

        {currentView == "Question Types" && <QueType />}
        {currentView == "Content Types" && <ContentType />}
        {currentView == "Content Data Types" && <ConTypeCategory />}
        {currentView == "Contents" && <Content />}
      </div>
    </div>
  );
}
