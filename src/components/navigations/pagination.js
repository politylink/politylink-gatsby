import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function Pagination(props) {
    return (
        <ReactPaginate
            previousLabel={'前へ'}
            nextLabel={'次へ'}
            breakLabel={'...'}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={props.onPageChange}
            containerClassName={'paginationClassName'}
            activeClassName={'activeClassName'}
            breakClassName={'breakClassName'}
        />);
}