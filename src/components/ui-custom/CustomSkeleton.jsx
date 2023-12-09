import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CustomSkeleton() {
  return (
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
  );
}
