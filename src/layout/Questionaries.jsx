"use client";
import React, { useEffect } from "react";
import { tabsQuestionaries } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import { useTabularView } from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import Purposes from "@/components/dashboard-admin/tabular-view/journey/Purposes";
import StartPoints from "@/components/dashboard-admin/tabular-view/journey/StartPoints";
import LearnerLevel from "@/components/dashboard-admin/tabular-view/journey/LearnerLevel";
import Goals from "@/components/dashboard-admin/tabular-view/journey/Goals";
import Question from "@/components/dashboard-admin/tabular-view/questionaries/Question";
import QueType from "@/components/dashboard-admin/tabular-view/questionaries/QueType";
import ContentType from "@/components/dashboard-admin/tabular-view/questionaries/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/questionaries/ConTypeCategory";
import Content from "@/components/dashboard-admin/tabular-view/questionaries/Content";
import AddQuePage from "@/components/dashboard-admin/modals/questionaries/AddQuePage";

export default function Questionaries({ content }) {
  //
  const tabularView = useTabularView((state) => state.data);
  const setTabularView = useTabularView((state) => state.setTabularView);

  useEffect(() => {
    setTabularView({
      currentPage: "add-question",
      currentView: "Add New Question",
    });
  }, []);

  const active_button = (btn) =>
    btn === tabularView.currentView
      ? " bg-slate-200 border-slate-400  shadow-sm"
      : " bg-slate-100 border-slate-200";

  return (
    <div className="max-h-[83vh] flex flex-col gap-2 p-2 w-full bg-white">
      <div className=" rounded-md p-1 flex justify-between">
        <EnhancedText kind={"two"} color=" text-slate-800">
          {tabularView.currentView}
        </EnhancedText>
        {tabularView.currentView == "Add New Question" && (
          <CustomButton
            click={() => {
              setTabularView({
                currentPage: "questionaries",
                currentView: "Questions",
              });
            }}
            style={
              "text-blue-800 bg-white font-semibold text-sm font-serif leading-3 py-1 hover:bg-slate-100 hover:outline-2 px-1 rounded-md"
            }
            txt="Back To Questions"
          />
        )}
      </div>

      {tabularView.currentPage == "questionaries" && (
        <div className="flex gap-2">
          {tabsQuestionaries.map((item, ind) => {
            return (
              <CustomButton
                key={ind}
                txt={item.title}
                style={`px-2 text-sm h-fit py-0.25 font-normal font-sans hover:shadow-md hover:drop-shadow-sm ${active_button(
                  item.title
                )}`}
                click={() => {
                  setTabularView({ currentView: item.title });
                }}
              />
            );
          })}
        </div>
      )}
      <div className="flex-grow overflow-y-scroll  ">
        {tabularView.currentView == "Questions" && <Question />}
        {tabularView.currentView == "Question Types" && <QueType />}
        {tabularView.currentView == "Content Types" && <ContentType />}
        {tabularView.currentView == "Content Type Categories" && (
          <ConTypeCategory />
        )}

        {tabularView.currentView == "Contents" && <Content />}
        {tabularView.currentView == "Add New Question" && (
          <AddQuePage useForEdit={false} />
        )}
        {tabularView.currentView == "Edit Question" && (
          <AddQuePage useForEdit={true} />
        )}
      </div>
    </div>
  );
}
