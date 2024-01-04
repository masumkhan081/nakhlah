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
  useTabularView,
} from "../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import QueConOption from "../tabular-view/QueConOption";
import EnhancedText from "@/components/ui-custom/EnhancedText";

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
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  const catagoriesData = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  //
  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);

  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );

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
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

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

  return (
    <>
      <DialogHeader className="overflow-y-scroll">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
          Start from top to {useForEdit ? "update" : "add"} question
        </DialogDescription> */}
        <div className="overflow-y-scroll h-[400px] pr-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 py-2 text-black text-lg"
          >
            <p className="   text-lg text-blue-600">Set The Question</p>
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
              <span className="text-red-700">{error.err0}</span>
            </div>
            <div className="flex flex-col ">
              <label className=" ">Question</label>
              <CustomInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ph="Enter the question"
                style="py-0.25 px-1"
              />
              <span className="text-red-700">{error.err0}</span>
            </div>

            <EnhancedText kind={"two"} color="text-blue-400 font-normal ">Set Answer Options</EnhancedText>

            <div className="flex flex-col gap-4">
              {/* option -1 */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <span className="bg-blue-200 rounded-full px-2 py-0.12 text-sm font-bold">
                    Answer Option{" "}
                    <span className="px-1 py-0.12 rounded-full bg-slate-100 ">
                      1
                    </span>
                  </span>
                  <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" />
                    <label htmlFor="vehicle1"> Mark as right answer</label>
                  </div>
                </div>
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type Category"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <div className="flex flex-col ">
                  <label className=" ">Content</label>
                  <CustomInput
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    ph="Enter option data"
                    style="py-0.25 px-1"
                  />
                  <span className="text-red-700">{error.err0}</span>
                </div>
              </div>
              {/* option -2 */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <span className="bg-blue-200 rounded-full px-2 py-0.12 text-sm font-bold">
                    Answer Option{" "}
                    <span className="px-1 py-0.12 rounded-full bg-slate-100 ">
                      2
                    </span>
                  </span>
                  <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" />
                    <label htmlFor="vehicle1"> Mark as right answer</label>
                  </div>
                </div>
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type Category"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <div className="flex flex-col ">
                  <label className=" ">Content</label>
                  <CustomInput
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    ph="Enter option data"
                    style="py-0.25 px-1"
                  />
                  <span className="text-red-700">{error.err0}</span>
                </div>
              </div>
              {/* option -3  */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <span className="bg-blue-200 rounded-full px-2 py-0.12 text-sm font-bold">
                    Answer Option{" "}
                    <span className="px-1 py-0.12 rounded-full bg-slate-100 ">
                      3
                    </span>
                  </span>
                  <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" />
                    <label htmlFor="vehicle1"> Mark as right answer</label>
                  </div>
                </div>
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type Category"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <div className="flex flex-col ">
                  <label className=" ">Content</label>
                  <CustomInput
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    ph="Enter option data"
                    style="py-0.25 px-1"
                  />
                  <span className="text-red-700">{error.err0}</span>
                </div>
              </div>
              {/* option -- 4 */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <span className="bg-blue-200 rounded-full px-2 py-0.12 text-sm font-bold">
                    Answer Option{" "}
                    <span className="px-1 py-0.12 rounded-full bg-slate-100 ">
                      4
                    </span>
                  </span>
                  <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" />
                    <label htmlFor="vehicle1"> Mark as right answer</label>
                  </div>
                </div>
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type Category"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <CustomSelect
                  value={initStateSelection}
                  label="Option Type"
                  options={["sample-1", "sample-2", "sample-3"]}
                />
                <div className="flex flex-col ">
                  <label className=" ">Content</label>
                  <CustomInput
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    ph="Enter option data"
                    style="py-0.25 px-1"
                  />
                  <span className="text-red-700">{error.err0}</span>
                </div>
              </div>
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
