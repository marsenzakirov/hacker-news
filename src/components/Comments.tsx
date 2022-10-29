import React, { useEffect } from "react";
import { Divider, Hero } from "react-daisyui";
import Comment from "./Comment";
interface IProps {
  count: number;
  comments: any[];
}
export default function Comments({ count, comments }: IProps) {
  return (
    <Hero>
      <Hero.Overlay className="bg-opacity-10 rounded-lg">
        <Hero.Content className="text-left">
          <div className="w-full">
            <h2 className="text-4xl font-bold mb-3">{count} Comments</h2>
            {comments.map((comment, index) => {
              if (comment.deleted) return null;
              if (comment.dead) return null;
              return (
                <Comment
                  author={comment.by}
                  text={comment.text}
                  date={comment.time}
                  kids={comment.kids}
                  key={index}
                />
              );
            })}
          </div>
        </Hero.Content>
      </Hero.Overlay>
    </Hero>
  );
}
