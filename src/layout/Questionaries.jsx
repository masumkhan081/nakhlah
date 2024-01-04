"use client";
import React, { useEffect } from "react";
import { tabsQuestionaries } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import { useTabularView } from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import Purposes from "@/components/dashboard-admin/tabular-view/Purposes";
import StartPoints from "@/components/dashboard-admin/tabular-view/StartPoints";
import LearnerLevel from "@/components/dashboard-admin/tabular-view/LearnerLevel";
import Goals from "@/components/dashboard-admin/tabular-view/Goals";
import Question from "@/components/dashboard-admin/tabular-view/Question";
import QueType from "@/components/dashboard-admin/tabular-view/QueType";
import ContentType from "@/components/dashboard-admin/tabular-view/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/ConTypeCategory";

export default function Questionaries({ content }) {
  //
  const tabularView = useTabularView((state) => state.data);
  const setTabularView = useTabularView((state) => state.setTabularView);

  useEffect(() => {
    setTabularView({
      currentPage: "questionaries",
      currentView: "Questions",
    });
  }, []);

  const active_button = (btn) =>
    btn === tabularView.currentView
      ? " bg-slate-200 border-slate-400 "
      : " bg-slate-100 border-slate-200";

  return (
    <div className="flex flex-col flex-wrap gap-2 p-2 w-full h-full">
      <div className=" rounded-md py-1 flex justify-start    ">
        <EnhancedText kind={"two"} color=" text-slate-800">
          {tabularView.currentView}
        </EnhancedText>
      </div>

      <div className="flex gap-2">
        {tabsQuestionaries.map((item, ind) => {
          return (
            <CustomButton
              key={ind}
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

      {tabularView.currentView == "Questions" && <Question />}
      {tabularView.currentView == "Question Types" && <QueType />}
      {tabularView.currentView == "Content Types" && <ContentType />}
      {tabularView.currentView == "Content Type Categories" && (
        <ConTypeCategory />
      )}
    </div>
  );
}
