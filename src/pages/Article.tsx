import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Preloader from "../components/Preloader";
import Container from "../components/Container"; // ! лол ты чего?
import { fetchJSON } from "../utils/fetchJSON";
import { Button, Divider, Alert } from "react-daisyui";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import { items } from "../types";

const getComments = async (id: number, kids: number[]) => {
  const comments = kids.map((id: number) => {
    return fetchJSON(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      { method: "get" }
    );
  });
  return Promise.all(comments);
};

// try to get cached article from store
const getCachedArticle = (id: number, news: items[]) => {
  const article = news.find((item: items) => item.id === id);
  if (article) {
    return article;
  }
  return null;
};

export default function New() {
  const { id } = useParams<{ id: string }>();

  // const cached news from store
  const News = useSelector((state: any) => state.news.items);

  const [comments, setComments] = useState<any>([]);
  const { data } = useSWR(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    (url) => {
      return fetchJSON(url, { method: "GET" });
    },
    { refreshInterval: 60000 }
  );
  const article = data || getCachedArticle(Number(id), News);
  const articleCachedOnly = getCachedArticle(Number(id), News);
  useEffect(() => {
    if (data && Array.isArray(data.kids)) {
      getComments(Number(id), data.kids).then((comments) => {
        setComments(comments);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!article) return <Preloader />;
  return (
    <Container>
      <h2 className="text-3xl">{article.title}</h2>
      <p>
        {new Date(article.time).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <p>
        <a
          href={article.url}
          target="_blank"
          className="text-sky-500"
          rel="noreferrer"
        >
          Source
        </a>{" "}
        - {article.by}
      </p>

      <Divider />
      <Button
        size="md"
        variant="outline"
        color="primary"
        className="my-3"
        onClick={() => {
          getComments(Number(id), data.kids).then((comments) => {
            setComments(comments);
          });
        }}
      >
        Update comments
      </Button>
      {comments.length > 0 && (
        <Comments count={article.descendants} comments={comments} />
      )}
      <Alert
        status="info"
        className="fixed bottom-3 right-3 max-w-[240px]"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        }
      >
        Click logo to go back
      </Alert>
    </Container>
  );
}
