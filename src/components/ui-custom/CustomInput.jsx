import React from "react";
import { Input } from "@/components/ui/input";

export default function CustomInput({ type, style, ph, value, onChange }) {
  const cmn_style = "border border-slate-400 py-0.5 px-1";
  return (
    <Input
      type="text"
      placeHolder={ph}
      onChange={onChange}
      value={value}
      className={style ? `${style} ${cmn_style} ` : `${cmn_style}`}
    />
  );
}
