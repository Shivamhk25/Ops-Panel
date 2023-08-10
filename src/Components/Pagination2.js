import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination2({handleClick, pageCount}) {
  
  return (
    <div>
      <ReactPaginate
        nextLabel="Next"
        onPageChange={handleClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination2;
