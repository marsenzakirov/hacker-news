import React from "react";
import { Divider } from "react-daisyui";

interface IProps {
  text: string;
  author: string;
  date: number;
}
export default function NestComment({ text, author, date }: IProps) {
  return (
    <div className="m-w-4/5">
      <h3 className="text-2xl">loh{author}</h3>
      <p>{text}</p>
      <p className="text-right">
        {new Date(date).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <Divider />
    </div>
  );
}
