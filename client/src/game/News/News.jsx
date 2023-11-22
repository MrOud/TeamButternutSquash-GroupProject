import { useState, useEffect } from "react";
import { list } from "./news-api.js";
import "./news.css";
import "../commonStyles/common.css";

export default function News({ setCurrentPage }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const firstLogin = sessionStorage.getItem("firstLogin");
    //!!!Anything written here will always run!!!

    //!!!Anything written from here onwards will only run on the very first login!!!
    if (firstLogin == "false") setCurrentPage("Town"); //If not first login, go to town without rendering news
    if (firstLogin == "true") sessionStorage.setItem("firstLogin", "false");

    //Will only render on user's first login
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

  function pageSetter(newPage) {
    setCurrentPage(newPage);
  }

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

        <p
          className="gameLink"
          onClick={() => {
            pageSetter("Town");
          }}
        >
          Go to town
        </p>
      </ul>
    </>
  );
}
