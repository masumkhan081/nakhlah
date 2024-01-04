"use client";
import React, { useEffect } from "react";
import { tabsLesson } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import { useTabularView } from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import TaskUnits from "@/components/dashboard-admin/tabular-view/TaskUnits";
import Tasks from "@/components/dashboard-admin/tabular-view/Tasks";
import LearningLevels from "@/components/dashboard-admin/tabular-view/LearningLevels";
import Lessons from "@/components/dashboard-admin/tabular-view/Lessons";

export default function LearningContent({ content }) {
  //
  const tabularView = useTabularView((state) => state.data);
  const setTabularView = useTabularView((state) => state.setTabularView);

  useEffect(() => {
    setTabularView({
      currentPage: "learning-materials",
      currentView: "Unit Lessons",
    });
  }, []);

  const active_button = (btn) =>
    btn === tabularView.currentView
      ? " bg-slate-200 border-slate-400 "
      : " bg-slate-100 border-slate-200";

  return (
    <div className="flex flex-col flex-wrap gap-2 p-2 w-full h-full  ">
      <div className=" rounded-md py-1 px-2 flex justify-start  ">
        <EnhancedText kind={"two"} color=" text-slate-800">
          {tabularView.currentView}
        </EnhancedText>
      </div>

      <div className="flex gap-2">
        {tabsLesson.map((item) => {
          return (
            <CustomButton
              txt={item.title}
              style={`px-2 text-sm h-fit py-0.25 font-normal font-sans ${active_button(
                item.title
              )}`}
              click={() => {
                setTabularView({ currentView: item.title });
              }}
            />
          );
        })}
      </div>

      {tabularView.currentView == "Learning Levels" && <LearningLevels />}
      {tabularView.currentView == "Tasks" && <Tasks />}
      {tabularView.currentView == "Task Units" && <TaskUnits />}
      {tabularView.currentView == "Unit Lessons" && <Lessons />}
    </div>
  );
}
