import Questionaries from "@/layout/Questionaries";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <Questionaries content={children} />
    </div>
  );
}
