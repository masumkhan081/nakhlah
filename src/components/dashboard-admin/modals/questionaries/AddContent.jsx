"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../../ui-custom/CustomInput";
//
import {
  useConTypeCategory,
  useConType,
  useContent,
  useTabularView,
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import {
  BASE_URL,
  getHandler,
  postMap,
  putMap,
  token,
} from "@/lib/requestHandler";

export default function AddContent({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };

  const [content, setContent] = useState(useForEdit ? rowData.title : "");
  const [selectedCategory, setSelectedCategory] = useState(
    useForEdit
      ? {
          id: rowData.content_type_category.id,
          title: rowData.content_type_category.title,
        }
      : initStateSelection
  );

  const [error, setError] = useState({
    err1: "",
    err2: "",
  });

  const categoryData = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  //
  const typeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  const afterUpdate = useContent((state) => state.afterUpdate);
  const afterAdd = useContent((state) => state.afterAdd);

  async function handleSubmit(e) {
    e.preventDefault();
    let err_1 = "";
    let err_2 = "";

    if (selectedCategory.title != "" && content.length > 0) {
      let formData = new FormData();

      var fileInput = document.getElementById("idInputFile");
      var file = fileInput.files[0];
      formData.append("files.image", file);

      const data = {
        title: content,
        content_type: {
          connect: [currentSubView.id],
        },
        content_type_category: {
          connect: [selectedCategory.id],
        },
      };
      audText.length > 0 ? (data["audio"] = audText) : "";

      formData.append("data", JSON.stringify(data));

      await fetch(
        useForEdit
          ? putMap["content"] + `/${rowData.id}?populate=icon`
          : postMap["content"],
        {
          method: useForEdit ? "PUT" : "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert("res:data:--" + JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            title: content,
            audio: audText,
            content_type: {
              id: currentSubView.id,
              title: currentSubView.title,
            },
            content_type_category: {
              id: selectedCategory.id,
              title: selectedCategory.title,
            },
            icon: data.data.attributes.icon?.data?.attributes?.formats?.small
              ?.url,
          };

          useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
          toast({
            title: useForEdit ? "Successfully Updated" : "Successfully Added",
          });
          document.getElementById("closeDialog")?.click();
        })
        .catch((error) => {
          alert("err: " + JSON.stringify(error));
          setError(JSON.stringify(error));
        });
    } else {
      if (selectedCategory.id == null) {
        err_1 = "Select content data type";
      }

      if (content.length < 1) {
        err_2 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2 });
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getHandler("content-type-category");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypeCategories(dataRenderable);
      }
    };

    if (Array.isArray(categoryData) && categoryData.length === 0) {
      fetchCategories();
    }
  }, [categoryData]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await getHandler("content-type");

      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypes(dataRenderable);
      }
    };

    if (Array.isArray(typeData) && typeData.length === 0) {
      fetchTypes();
    }
  }, [typeData]);

  const [audText, setAudText] = useState(useForEdit ? rowData.audio : "");
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

  const currentView = useTabularView((state) => state.data.currentView);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
          <span className="ms-2 font-normal text-sm font-mono text-blue-500">
            {currentSubView.title.replaceAll("_", " ")}
          </span>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-0">
            <CustomSelect
              label={"Content Data Type"}
              value={selectedCategory}
              options={categoryData}
              bg="wh"
              onChange={(value) =>
                setSelectedCategory({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>

          <div className="flex flex-col gap-0">
            <label className="flex justify-between">
              <span>Content Title</span>
              <span className=" text-red-800">{error.err2}</span>
            </label>
            <CustomInput
              type="text"
              id="idContTitle"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ph="Enter content"
              style="py-0.12 px-1"
            />
            <span className="text-red-700">{error.err3}</span>
          </div>
          <div className="flex flex-col gap-0">
            <label className="flex justify-between">
              <span>Audio Text</span>
              <span className=" text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              id="idAudText"
              value={audText}
              onChange={(e) => setAudText(e.target.value)}
              ph="Enter content"
              style="py-0.12 px-1"
            />
            <span className="text-red-700">{error.err3}</span>
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

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </DialogHeader>
    </>
  );
}
