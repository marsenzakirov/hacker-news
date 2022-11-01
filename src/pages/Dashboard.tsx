import React, { useEffect } from "react";
import Card from "../components/Card";
import CardLoading from "../components/CardLoading";
import Container from "../components/Container";
import useSWR from "swr";
import { useState } from "react";
import { fetchJSON } from "../utils/fetchJSON";
import { useDispatch, useSelector } from "react-redux";
import { addNews, setNews } from "../store/newsSlice";
import { Button } from "react-daisyui";
import { items } from "../types";

export default function Dashboard() {
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const news = useSelector((state: any) => state.news.items);
  const dispatch = useDispatch();

  const { data } = useSWR(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
    (url) => {
      return fetchJSON(url, { method: "get" });
    },
    { refreshInterval: 60000 }
  );
  useEffect(() => {
    if (Array.isArray(data)) {
      dispatch(setNews([]));
      setFetching(true);
    }
  }, [data]);
  useEffect(() => {
    if (Array.isArray(data) && fetching) {
      setCurrentPage(1);
      const news = data
        .slice(currentPage * 10, currentPage * 10 + 10)
        .map((id) => {
          return fetchJSON(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
            { method: "get" }
          );
        });
      Promise.all(news).then((newItems) => {
        dispatch(addNews(newItems));
        setFetching(false);
        setCurrentPage((page) => page + 1);
      });
    }
  }, [data, fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e: any) => {
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
      <div className="flex justify-between items-center mb-3">
      <h2 className="text-3xl">News</h2>
      <Button
				size='md'
				variant='outline'
				color='primary'
				className='my-3'
				onClick={() => {
          fetchJSON("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty", { method: "get" });
				}}>
				Update news
			</Button>
      </div>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {news.length > 0
          ? news.map((item: items, index: number) => {
              return (
                <Card
                  key={index}
                  id={item.id}
                  author={item.by}
                  createdAt={item.time}
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
