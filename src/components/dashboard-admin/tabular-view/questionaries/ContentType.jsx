"use client";
import DataTable from "../../table/DataTable";

import { useConType } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import ColoumnContentType from "../../table/ColoumnContentType";

import React from "react";
import { renderableContTypes } from "@/lib/fetchFunctions";

export default function ContentType() {
  //
  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type");
      if (response.status === 200) {
        setConTypes(renderableContTypes(response.data.data));
      }
    };
    if (Array.isArray(conTypeData) && conTypeData.length === 0) {
      fetch();
    }
  }, [conTypeData]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {conTypeData.length != 0 ? (
        <DataTable
          data={conTypeData}
          columns={ColoumnContentType}
          view="content-type"
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
