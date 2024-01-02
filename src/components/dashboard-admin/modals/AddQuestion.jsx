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
  useConType,
  useConTypeCategory,
  useQueType,
  useQuestion,
} from "../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import QueConOption from "../tabular-view/QueConOption";

export default function AddQuestion({ rowData, useForEdit }) {
  const { toast } = useToast();
  //
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");

  const [error, setError] = useState({
    err0: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";

    if (question.length > 2) {
      const queResult = useForEdit
        ? await putHandler("question", rowData.id, {
            data: { question: question },
          })
        : await postHandler("question", {
            data: { question: question },
          });
      if (queResult.status == 200) {
        const data = {
          id: queResult.data.data.id,
          question: queResult.data.data.attributes.question,
        };
        useForEdit ? afterUpdate(data) : afterAdd(data);
        toast({
          title: queResult.message,
        });
        document.getElementById("closeDialog")?.click();
      } else if (queResult.status == 400) {
        setError({ err0: queResult.error });
      }
    }

    //  specific errors
    else {
      if (question.length < 3) {
        err_0 = "Too Short";
      }
      setError({
        err0: err_0,
      });
    }
  }

  return (
    <>
      <DialogHeader className="">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Question
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
          Start from top to {useForEdit ? "update" : "add"} question
        </DialogDescription> */}
        <div className="overflow-y-scroll h-auto pr-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 py-2 text-black text-lg"
          >
            <div className="flex flex-col ">
              <label className=" ">Question</label>
              <CustomInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ph="Enter the question"
              />
              <span className="text-red-700">{error.err0}</span>
            </div>

            <div className="sticky bottom-0 bg-white py-1 w-full ">
              <CustomButton
                txt={useForEdit ? "UPDATE" : "ADD"}
                type="submit"
                style="text-base w-full mt-2 font-semibold text-blue-800 bg-slate-100 leading-1"
              />
            </div>
          </form>
        </div>
      </DialogHeader>
    </>
  );
}
