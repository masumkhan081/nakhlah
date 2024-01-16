"use client";
import DataTable from "../../table/DataTable";
import ColContent from "../../table/ColContent";
import { useContent } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, putHandler } from "@/lib/requestHandler";
import { renderableContents } from "@/lib/fetchFunctions";

const Content = () => {
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-all");
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
      }
    };
    if (Array.isArray(contents) && contents.length === 0) {
      fetch();
    }
  }, [contents]);

  return (
    <div className="w-full bg-white rounded-xl">
      {contents.length != 0 ? (
        <DataTable data={contents} columns={ColContent} view="content" />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};

export default Content;
