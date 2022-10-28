import React from "react";
import { Card, Stats } from "react-daisyui";

export default function CardLoading() {
  return (
    <Card>
      <Card.Body className="animate-pulse flex space-x-4">
        <Card.Title
          tag="h3"
          className="h-6 bg-slate-700 rounded col-span-2"
        ></Card.Title>
        <Stats className="shadow font-sans mb-2">
          <Stats.Stat>
            <Stats.Stat.Item
              variant="figure"
              className="text-primary"
            ></Stats.Stat.Item>
            <Stats.Stat.Item
              variant="title"
              className="h-4 bg-slate-700 rounded col-span-2 mb-3"
            ></Stats.Stat.Item>
            <Stats.Stat.Item
              variant="value"
              className="h-3 bg-slate-700 rounded col-span-2"
            ></Stats.Stat.Item>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Item
              variant="title"
              className="h-4 bg-slate-700 rounded col-span-2 mb-3"
            ></Stats.Stat.Item>
            <Stats.Stat.Item
              variant="value"
              className="h-3 bg-slate-700 rounded col-span-2"
            ></Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
        <p className="max-h-4 bg-slate-700 rounded col-span-2"></p>
      </Card.Body>
    </Card>
  );
}
