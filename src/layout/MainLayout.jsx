"use client";
import { usePathname } from "next/navigation";
import React from "react";

const MainLayout = ({ child }) => {
  const path = usePathname();

  return (
    <>
      {
        path == '/login' || path == '/registration' || path == '/mobile-number' || path == '/forget-password' || path == '/reset_password' || path == '/getstart' ?
          <div className='bg-[--bgPrimary] min-h-screen flex justify-center items-center'>
            <div className={`w-full  sm:w-[80%]   lg:w-[70%]    sm:my-10 my-0  bg-white  rounded-2xl`}>
              {path != '/getstart' ?
                <div className={`w-[60%] sm:w-[50%]  lg:w-[40%] xl:w-[40%] 2xl:w-[30%] mx-auto h-full  my-16 `}>
                  {child}
                </div>
                :
                <>
                  {child}
                </>
              }
            </div>
          </div>
          :
          <>
            {child}
          </>
      }
    </>
  );
};

export default MainLayout;
