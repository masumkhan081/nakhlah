"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import { useQueType } from "../../../../store/useAdminStore";
import columnQueType from "../../table/ColQueType";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableQueType } from "@/lib/fetchFunctions";

const QueType = () => {
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      console.log(response.data);
      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    }
  }, [queTypeData]);

  return (
    <div className="w-full h-full bg-white  rounded-xl">
      {queTypeData.length != 0 ? (
        <DataTable
          data={queTypeData}
          columns={columnQueType}
          view={"question-type"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};

export default QueType;
