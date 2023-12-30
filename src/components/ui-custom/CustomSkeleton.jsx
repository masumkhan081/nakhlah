import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CustomSkeleton() {
  return (
    <div className="w-full md:py-12 sm:py-6 flex flex-col gap-4 mt-6 justify-center items-center">
      <div className="space-y-2 ">
        <Skeleton className="h-4 w-[160px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
      <div className="space-y-2 mt-6">
        <Skeleton className="h-4 w-[160px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  );
}
