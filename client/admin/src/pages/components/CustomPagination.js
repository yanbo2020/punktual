import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({nPages, currentPage, setCurrentPage}) => {

    const onPrevItem = () => {
        const prevActiveItem = currentPage === 1 ? currentPage : currentPage - 1;
        setCurrentPage(prevActiveItem);
      };
    
    const onNextItem = (totalPages) => {
        const nextActiveItem = currentPage === totalPages ? currentPage : currentPage + 1;
        setCurrentPage(nextActiveItem);
      };

    const items = [];
      for (let number = 1; number <= nPages; number++) {
        const isItemActive = currentPage === number;
    
        const handlePaginationChange = () => {
          setCurrentPage(number);
        };
    
        items.push(
          <Pagination.Item active={isItemActive} key={number} onClick={handlePaginationChange}>
            {number}
          </Pagination.Item>
        );
      };

    return(
        <Pagination size="sm" className="mt-3">
        <Pagination.Prev disabled={false} onClick={onPrevItem}>
          {true ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : "Previous"}
        </Pagination.Prev>
        {items}
        <Pagination.Next onClick={() => onNextItem(nPages)}>
          {true ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : "Next"}
        </Pagination.Next>
      </Pagination>
    );
};

export default CustomPagination;