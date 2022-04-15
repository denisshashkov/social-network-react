import React, { useState } from "react";
import classes from "./pagination.module.scss";

function Pagination({
  totalItemCount,
  pageSize,
  currentPage,
  changePageHandler,
  portionSize = 8,
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
    <div>
      {portionNumber > 1 && (
        <button onClick={toPrevPortionHandler}>Prev</button>
      )}

      {pages
        .filter(
          (page) =>
            page >= leftBorderOfPageNumber && page <= rightBorderOfPageNumber
        )
        .map((page) => (
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
        ))}

      {portionCount > portionNumber && (
        <button onClick={toNextPortionHandler}>Next</button>
      )}
    </div>
  );
}

export default Pagination;
