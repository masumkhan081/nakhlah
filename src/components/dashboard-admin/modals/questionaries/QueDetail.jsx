import { DialogHeader } from "@/components/ui/dialog";
import { useTabularView } from "@/store/useAdminStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

export default function QueDetail({rowData}) {
  const currentSubView = useTabularView((state) => state.data.currentSubView);

  return (
    <DialogHeader className=" h-fit  ">
      <DialogTitle className="textHeader textPrimaryColor ">
        Question Detail
        <span className="ms-2 font-normal text-sm font-mono text-blue-500">
          {currentSubView.title.replaceAll("_", " ")}
        </span>
      </DialogTitle>
      <div className="w-full p-3 flex flex-col gap-2  rounded-md  overflow-y-auto h-[400px] max-h-[400px]">
        {JSON.stringify(rowData)}

        <span></span>
      </div>
    </DialogHeader>
  );
}
