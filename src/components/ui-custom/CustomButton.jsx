import React from "react";
import { Button } from "@/components/ui/button";

export default function CustomButton({ startIcon,txt, click, type, style }) {
  const cmn_style = "border border-slate-300 py-0.25 text-base";
  return (
    <Button
      type={type}
      onClick={click}
      className={style ? `${style}` : `${cmn_style}`}
    >
    {startIcon}
      {txt}
    </Button>
  );
}
