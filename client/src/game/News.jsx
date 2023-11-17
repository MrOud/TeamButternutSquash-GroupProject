import { useState, useEffect } from "react";
import { list } from "./news-api.js";
import "./news.css";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setNews(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <p>Here is the latest news of the realm!</p>
      <ul className="newsList">
        {news.map((newsItem, i) => {
          return (
            <li key={i}>
              {i + 1} - {newsItem.message}
            </li>
          );
        })}
      </ul>
    </>
  );
}
