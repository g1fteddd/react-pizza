import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

const Pagination = ({ itemsCount, pageSize, setCurrentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    console.log(itemsCount, pageSize);
    return (
        <ReactPaginate
            className={styles["paginate"]}
            breakLabel="..."
            nextLabel=">"
            onPageChange={setCurrentPage}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
