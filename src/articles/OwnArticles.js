import { useEffect, useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import { setTitle } from "../assorted/setTitle";
import strings from "../i18n/definitions";

import ArticlePreview from "./ArticlePreview";
import SortingButtons from "./SortingButtons";

import * as s from "../components/TopMessage.sc";
import useArticlePagination from "../hooks/useArticlePagination";

export default function OwnArticles({ api }) {
  const [articleList, setArticleList] = useState(null);
  const [originalList, setOriginalList] = useState(null);

  const [handleScroll, isWaitingForNewArticles, noMoreArticlesToShow] =
    useArticlePagination(
      api,
      articleList,
      setArticleList,
      "Saved Articles",
      (pageNumber, handleArticleInsertion) => {
        api.getSavedUserArticles(pageNumber, handleArticleInsertion);
      },
    );

  useEffect(() => {
    setTitle("Saved Articles");
    api.getSavedUserArticles(0, (articles) => {
      setArticleList(articles);
      setOriginalList(articles);
    });
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  if (articleList == null) {
    return <LoadingAnimation />;
  }

  if (articleList.length === 0) {
    return <s.TopMessage>{strings.noOwnArticles}</s.TopMessage>;
  }

  return (
    <>
      <br />
      <br />
      <SortingButtons
        articleList={articleList}
        originalList={originalList}
        setArticleList={setArticleList}
      />
      {articleList.map((each) => (
        <ArticlePreview
          api={api}
          key={each.id}
          article={each}
          dontShowSourceIcon={false}
        />
      ))}
      {isWaitingForNewArticles && (
        <LoadingAnimation delay={0}></LoadingAnimation>
      )}
      {noMoreArticlesToShow && articleList.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "2em 0px",
          }}
        >
          There are no more saved articles.
        </div>
      )}
    </>
  );
}
