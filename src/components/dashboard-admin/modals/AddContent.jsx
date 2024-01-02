"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../ui-custom/CustomInput";
//
import {
  useConTypeCategory,
  useConType,
  useContent,
} from "../../../store/useAdminStore";
import CustomSelect from "../../ui-custom/CustomSelect";
import CustomButton from "../../ui-custom/CustomButton";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";

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

  const [selectedType, setSelectedType] = useState(
    useForEdit
      ? {
          id: rowData.content_type.id,
          title: rowData.content_type.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
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
    let err_3 = "";
    if (
      selectedCategory.title != "" &&
      selectedType.title != "" &&
      !(content.length < 3)
    ) {
      const data = {
        title: content,
        content_type: {
          connect: [selectedType.id],
        },
        content_type_category: {
          connect: [selectedCategory.id],
        },
      };

      const result = useForEdit
        ? await putHandler("content", rowData.id, { data })
        : await postHandler("content", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;

        data = {
          id: data.id,
          title: data.attributes.title,
          content_type: {
            id: selectedType.id,
            title: selectedType.title,
          },
          content_type_category: {
            id: selectedCategory.id,
            title: selectedCategory.title,
          },
        };

        useForEdit ? afterUpdate(data) : afterAdd(data);
        toast({
          title: useForEdit
            ? "Item Updated Succesfully"
            : "Item Added Successfully",
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        let errors = result.data.error.details.errors;
        setError({
          err0: errors[0].message,
          err1: errors[1]?.message,
          err2: errors[2]?.message,
        });
      }
    } else {
      if (selectedCategory.id == null) {
        err_1 = "Select content type category";
      }
      if (selectedType.id == null) {
        err_2 = "Select content type";
      }
      if (content.length < 3) {
        err_3 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2, err3: err_3 });
    }
  }

  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
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

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Content
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
           instructions
        </DialogDescription> */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Content Type Category</label>
            <CustomSelect
              value={selectedCategory}
              options={categoryData}
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
              value={selectedType}
              options={typeData}
              bg="light"
              onChange={(value) =>
                setSelectedType({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err2}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Content</span>
              <span className=" text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ph="Enter content"
            />
            <span className="text-red-700">{error.err3}</span>
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800"
          />
        </form>
      </DialogHeader>
    </>
  );
}
