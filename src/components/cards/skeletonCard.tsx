import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="px-2 py-5 w-full">
      <div className="flex gap-2 items-start">
        <Skeleton className="w-14 h-14 my-2 rounded-full" />

        <div className="flex flex-col justify-between gap-7">
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
