import { useTabularView } from "@/store/useAdminStore";
import React from "react";
import AddMCQ from "./AddMCQ";
import AddSM from "./AddSM";

export default function EditModalContainer({ rowData }) {
  //
  const currentSubView = useTabularView((state) => state.data.currentSubView);

  if (currentSubView.title == "MCQ") {
    return <AddMCQ title="question" useForEdit={true} rowData={rowData} />;
  } else if (currentSubView.title == "Sentence Making") {
    return <AddSM title="question" useForEdit={true} rowData={rowData} />;
  } else if (currentSubView.title == "Fill In The Blank") {
    return <AddMCQ title="question" useForEdit={true} rowData={rowData} />;
  }
}
