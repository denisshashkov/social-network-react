import React, { useState } from "react";
import Button from "../button/Button";
import classes from "./pagination.module.scss";

function Pagination({
  totalItemCount,
  pageSize,
  currentPage,
  changePageHandler,
  portionSize = 5,
}) {
  const pagesCount = Math.ceil(totalItemCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftBorderOfPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightBorderOfPageNumber = portionNumber * portionSize;

  const toPrevPortionHandler = () => {
    setPortionNumber(portionNumber - 1);
  };

  const toNextPortionHandler = () => {
    setPortionNumber(portionNumber + 1);
  };

  return (
    <div className={classes.pagination}>
      <div className={classes.pagination__button}>
        {portionNumber > 1 && (
          <Button onClick={toPrevPortionHandler}>Prev</Button>
        )}
      </div>

      {pages
        .filter(
          (page) =>
            page >= leftBorderOfPageNumber && page <= rightBorderOfPageNumber
        )
        .map((page) => (
          <div className={classes.pagination__block}>
            <span
              key={page}
              className={
                currentPage === page ? classes.selectedPage : classes.pageNumber
              }
              onClick={(e) => {
                changePageHandler(page);
              }}
            >
              {page}
            </span>
          </div>
        ))}

      <div className={classes.pagination__button}>
        {portionCount > portionNumber && (
          <Button onClick={toNextPortionHandler}>Next</Button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
