import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function Pagination(props) {
    return (
        <ReactPaginate
            forcePage={props.page - 1}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={(data) => {
                props.onPageChange(data.selected + 1)
            }}
            previousLabel={'前へ'}
            nextLabel={'次へ'}
            breakLabel={'...'}
            containerClassName={'paginationClassName'}
            activeClassName={'activeClassName'}
            breakClassName={'breakClassName'}
        />);
}