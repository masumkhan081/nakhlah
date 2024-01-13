"use client";
import DataTable from "../../table/DataTable";
import { useConTypeCategory } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import ColContentCategory from "../../table/ColContentCategory";
import { renderableContTypeCategories } from "@/lib/fetchFunctions";

export default function ConTypeCategory() {
  const conTypeCatagories = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type-category"); 
      if (response.status === 200) { 
        setConTypeCategories(renderableContTypeCategories(response.data.data));
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
          columns={ColContentCategory}
          view={"content-type-category"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
