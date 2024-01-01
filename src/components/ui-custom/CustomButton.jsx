import React from "react";
import { Button } from "@/components/ui/button";

export default function CustomButton({ txt, click, type, style }) {
  return (
    <Button
      type={type}
      onClick={click}
      className={style}
    >
      {txt}
    </Button>
  );
}
