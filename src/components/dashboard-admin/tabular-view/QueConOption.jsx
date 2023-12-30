"use client";
import DataTable from "../table/DataTable";
import ColQueConOption from "../table/ColQueConOption";

const QueConOption = () => {
  return (
    <div className="w-full bg-white  rounded-xl">
      <DataTable
        data={""}
        columns={ColQueConOption}
        view={"question-content-option"}
      />
    </div>
  );
};

export default QueConOption;
