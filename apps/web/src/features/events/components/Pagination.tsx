"use client";
import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  limit: number;
  onChangePage: ({ selected }: { selected: number }) => void;
}

const Pagination: FC<PaginationProps> = ({ total, limit, onChangePage }) => {
  return (
    <ReactPaginate
      pageCount={Math.ceil(total / limit)}
      onPageChange={onChangePage}
      previousLabel={"<"}
      nextLabel={">"}
      containerClassName={styles.pagination}
      pageClassName={styles.pageItem}
      previousClassName={styles.pageItem}
      nextClassName={styles.pageItem}
      activeClassName={styles.activaPage}
      pageLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLink}
      nextLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activePage}
    />
  );
};

export default Pagination;
