"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import {} from "../../../lib/url";
import { useQueType } from "../../../store/useAdminStore";
import columnQueType from "../table/ColQueType";
import { getHandler } from "@/lib/requestHandler";
import { Skeleton } from "@/components/ui/skeleton";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

const QueType = () => {
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

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
    <div className="w-full bg-white  rounded-xl">
      {queTypeData.length != 0 ? (
        <DataTable
          data={queTypeData}
          columns={columnQueType}
          view={"question-type"}
        />
      ) : (
        <CustomSkeleton/>
      )}
    </div>
  );
};

export default QueType;
