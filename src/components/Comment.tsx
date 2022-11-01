import React, { useEffect,useState } from "react";
import { Divider, Button } from "react-daisyui";
import { fetchJSON } from "../utils/fetchJSON";
import NestComment from "./NestComment";
import {items} from "../types/index";
interface IProps {
  text: string;
  author: string;
  date: number;
  kids: number[];
}
export default function Comment({ text, author, date, kids }: IProps) {
  const [nestComments, setNestComments] = useState<items[]>([]);
  const [showNestComments, setShowNestComments] =
    useState<boolean>(false);
  useEffect(() => {
    if (Array.isArray(kids)) {
      const comments = kids.map((id: number) => {
        return fetchJSON(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
          { method: "get" }
        );
      });
      Promise.all(comments).then((comments) => {
        setNestComments(comments);
      });
    }
  }, [kids]);
  return (
    <div>
      <h3 className="text-2xl">{author}</h3>
      <p>{text}</p>
      <p className="mb-4 text-right">
        {new Date(date).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      {showNestComments ? (
        <>
          <Divider />
          <div className="w-[95%] ml-auto">
            {nestComments.length > 0 &&
              nestComments.map((item, index) => {
                if (item.deleted) return null;
                if (item.dead) return null;
                return (
                  <NestComment
                    text={item.text}
                    author={item.by}
                    date={item.time}
                    key={index}
                  />
                );
              })}
          </div>
        </>
      ) : (
        nestComments.length > 0 && (
          <>
            <Button
              color="ghost"
              variant="outline"
              onClick={() => setShowNestComments(true)}
            >
              Show comments
            </Button>
          </>
        )
      )}
      <Divider />
    </div>
  );
}
