import React from 'react';
import '../../styles/search.css';

const Pagination = (props) => {
  const handlePageChange = (pageNumber) => {
    props.onChangePage(pageNumber);
  };

  return (
    <div className="paginationspace">
      <div className="pagination">
        <button>&laquo;</button>
        {props.pages.map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button>&raquo;</button>
      </div>
    </div>
  );
}

export default Pagination;
