import React from "react";
import { Card, Stats } from "react-daisyui";
interface IProps {
  title: string;
  rating: number;
  author: string;
  createdAt: string;
}

export default function CardComponent ({ title, rating, author, createdAt }: IProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title tag="h3" className="">
          {title}
        </Card.Title>
        <Stats className="shadow font-sans mb-2">
          <Stats.Stat>
            <Stats.Stat.Item
              variant="figure"
              className="text-primary"
            ></Stats.Stat.Item>
            <Stats.Stat.Item variant="title" className="text-sm">
              Author
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="value" className="text-primary text-lg">
              {author}
            </Stats.Stat.Item>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Item variant="title" className="text-sm">
              Rating
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="value" className="text-secondary text-lg">
              {rating}
            </Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
        <p className="text-right">Created at: {createdAt}</p>
      </Card.Body>
    </Card>
  );
}
