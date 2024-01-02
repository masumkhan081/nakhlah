"use client";
import DataTable from "../table/DataTable";
import { useConTypeCategory } from "../../../store/useAdminStore";
import { useEffect } from "react";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import ColConTypeCategory from "../table/ColConTypeCategory";
 

const ConTypeCategory = () => {
  const conTypeCatagories = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );

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
    if (Array.isArray(conTypeCatagories) && conTypeCatagories.length === 0) {
      fetch();
    }
  }, [conTypeCatagories]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {conTypeCatagories.length != 0 ? (
        <DataTable
          data={conTypeCatagories}
          columns={ColConTypeCategory}
          view={"content-type-category"}
        />
      ) : (
        <CustomSkeleton/>
      )}
    </div>
  );
};

export default ConTypeCategory;
