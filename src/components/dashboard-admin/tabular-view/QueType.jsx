"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import {} from "../../../lib/url";
import { useQueType } from "../../../store/useAdminStore";
import columnQueType from "../table/ColQueType";
import { getHandler } from "@/lib/requestHandler";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="w-full md:py-12 sm:py-6 flex flex-col gap-4 justify-center items-center">
          <Skeleton className="bg-slate-500 h-16 w-16 rounded-full" />
          <div className="flex-col gap-6">
            <Skeleton className="bg-slate-400  w-[250px] mb-2 text-slate-50 ps-2 py-1 ">
              Loading ...
            </Skeleton>
            <Skeleton className="bg-slate-300 h-4 w-[200px] mb-2" />
            <Skeleton className="bg-slate-200 w-[150px] h-[20px] rounded-md " />
          </div>
        </div>
      )}
    </div>
  );
};

export default QueType;
