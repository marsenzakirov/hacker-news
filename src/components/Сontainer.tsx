import React from "react";
interface IProps {
  children: React.ReactNode;
  className?: string;
}
export default function Сontainer({ children, className }: IProps) {
  return (
    <div className={"px-2 max-w-7xl mx-auto h-full " + className}>{children}</div>
  );
}
