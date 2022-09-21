import Pagination from "react-js-pagination";
import {useState} from "react";
import "../src/paging.css";

const Paging = ({page, count, setPage}: any) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;
