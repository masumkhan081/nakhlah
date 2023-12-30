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

export default function AddQuestion({ rowData, useForEdit }) {
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  //
  const catagoriesData = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  //
  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  // function filterContentTypes(id) {
  //   setFilteredConTypes(
  //     conTypeData.filter((item) => item.learning_journey_unit.id == id)
  //   );
  // }

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");
  const [content, setContent] = useState(useForEdit ? rowData.content : "");
  const [selectedCategory, setSelectedCategory] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  const [selectedConType, setSelectedConType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );

  const [filteredConTypes, setFilteredConTypes] = useState([]);

  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
    err4: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    if (
      selectedCategory.title != "" &&
      selectedConType.title != "" &&
      selectedQueType.title != "" &&
      !(question.length < 3)
    ) {
      postHandler("question", {
        data: { question },
      })
        .then((queResult) => {
          alert("queResult:: " + JSON.stringify(queResult));
          postHandler("content", {
            data: {
              title: content,
              content_type: {
                connect: [selectedConType.id],
              },
              content_type_category: {
                connect: [selectedCategory.id],
              },
            },
          })
            .then((contResult) => {
              postHandler("question-content", {
                data: {
                  question: {
                    connect: [queResult.data.data.id],
                  },
                  question_type: {
                    connect: [selectedQueType.id],
                  },
                  content: {
                    connect: [contResult.data.data.id],
                  },
                },
              })
                .then((queContResult) => {
                  useForEdit ? afterUpdate(data) : afterAdd(data);
                  toast({
                    title: useForEdit
                      ? "Item Updated Succesfully"
                      : "Item Added Successfully",
                  });
                  document.getElementById("closeDialog")?.click();
                })
                .catch((err3) => {
                  alert(JSON.stringify(err3));
                  let errors = result.data.error.details.errors;
                  setError({
                    err0: "errors[0].message",
                    err1: "errors[1]?.message",
                    err2: "errors[2]?.message",
                    err3: "errors[3]?.message",
                    err4: "errors[4]?.message",
                  });
                });
            })
            .catch((err2) => alert(JSON.stringify(err2)));
        })
        .catch((err1) => alert(JSON.stringify(err1)));
    } else if (selectedQueType.id == null) {
      err_0 = "Select Question Type First";
    } else if (selectedCategory.id == null) {
      err_1 = "Select ";
    } else if (selectedConType.id == null) {
      err_2 = "Select ";
    } else if (content.length < 3) {
      err_3 = "Too Short";
    } else if (question.length < 3) {
      err_4 = "Too Short";
    }
    setError({
      err0: err_0,
      err1: err_1,
      err2: err_2,
      err3: err_3,
      err4: err_4,
    });
  }

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

  // content-type-category
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
    if (Array.isArray(catagoriesData) && catagoriesData.length === 0) {
      fetch();
    }
  }, [catagoriesData]);

  // content-type
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
    if (Array.isArray(conTypeData) && conTypeData.length === 0) {
      fetch();
    }
  }, [conTypeData]);

  // useEffect(() => {
  //   if (selectedCategory.id != null) {
  //     useForEdit ? "" : setSelectedCategory(initStateSelection);
  //     filterContentTypes(selectedCategory.id);
  //   }
  // }, [selectedCategory]);

  return (
    <>
      <DialogHeader className="">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Question
        </DialogTitle>
        <DialogDescription className="textNormal textSecondaryColor">
          Start from top to {useForEdit ? "update" : "add"} question
        </DialogDescription>
        <div className="overflow-y-scroll h-[430px] pr-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 py-2 text-black text-lg"
          >
            <div className="flex flex-col gap-1">
              <label>Select Question Type</label>
              <CustomSelect
                value={selectedQueType}
                options={queTypeData}
                bg="light"
                onChange={(value) =>
                  setSelectedQueType({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err0}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex justify-between">
                <span>The Question</span>
              </label>
              <CustomInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ph="Question ?"
              />
              <span className="text-red-700">{error.err4}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label>Content Type Categoy</label>
              <CustomSelect
                value={selectedCategory}
                options={catagoriesData}
                bg="light"
                onChange={(value) =>
                  setSelectedCategory({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err1}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label>Content Type</label>
              <CustomSelect
                value={selectedConType}
                options={conTypeData}
                bg="light"
                onChange={(value) =>
                  setSelectedConType({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err2}</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex justify-between">
                <span>Question content</span>
              </label>
              <CustomInput
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ph="Content"
              />
              <span className="text-red-700">{error.err3}</span>
            </div>

            <CustomButton
              txt={useForEdit ? "Update" : "Add"}
              type="submit"
              style="text-blue-800"
            />
          </form>
        </div>
      </DialogHeader>
    </>
  );
}
