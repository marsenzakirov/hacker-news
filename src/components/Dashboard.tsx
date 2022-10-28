import React, { useEffect } from "react";
import Card from "./Сard";
import CardLoading from "./СardLoading";
import Container from "./Сontainer";
import useSWR from "swr";
import { useState } from "react";
import { fetchJSON } from "../utils/fetchJSON";
export default function Dashboard() {
  const [news, setNews] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
    (url) => {
      return fetchJSON(url, { method: "get" }).then((arr) => {
        setCurrentPage(1);
        return arr;
      });
    },
    { refreshInterval: 60000 }
  );
  useEffect(() => {
    if (Array.isArray(data)) {
      setNews([]);
      setFetching(true);
    }
  }, [data]);
  useEffect(() => {
    if (Array.isArray(data) && fetching) {
      const news = data
        .slice(currentPage * 10, currentPage * 10 + 10)
        .map((id) => {
          return fetchJSON(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
            { method: "get" }
          );
        });
      Promise.all(news).then((news) => {
        setNews((item) => [...item, ...news]);
        setFetching(false);
        setCurrentPage((page) => page + 1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e: any) => {
    console.log(
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight)
    );
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      600
    ) {
      setFetching(true);
    }
  };
  return (
    <Container className="py-5">
      <h2 className="text-3xl mb-3">News</h2>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {news.length > 0
          ? news.map((item, index) => {
              return (
                <Card
                  key={index}
                  author={item.by}
                  createdAt="19.22.2003"
                  rating={item.score}
                  title={item.title}
                />
              );
            })
          : Array(10)
              .fill(0)
              .map((_, index) => {
                return <CardLoading key={index} />;
              })}
      </ul>
    </Container>
  );
}
