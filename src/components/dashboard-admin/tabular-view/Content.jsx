"use client";
import DataTable from "../table/DataTable";
import ColContent from "../table/ColContent";
import { useContent } from "../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, putHandler } from "@/lib/requestHandler";

const Content = () => {
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content");

      if (response.status === 200) {
        const contentData = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes?.title,
            content_type: {
              id: item.attributes?.content_type?.data.id,
              title: item.attributes?.content_type?.data?.attributes?.title,
            },
            content_type_category: {
              id: item.attributes?.content_type_category?.data?.id,
              title:
                item.attributes?.content_type_category?.data?.attributes?.title,
            },
          };
        });
        setContents(contentData);
      }
    };
    if (Array.isArray(contents) && contents.length === 0) {
      fetch();
    }
  }, [contents]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {contents.length != 0 ? (
        <DataTable data={contents} columns={ColContent} view="content" />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
};

export default Content;
