import React from 'react';

/**
 * Component for pagination
 */

const Pagination = (props) => {
  const { perPage, total, handlePage } = props;
  const pages = [];
  let pageTotal = Math.floor(total / perPage);

  if ((total % perPage) > 0) {
    pageTotal += 1;
  }
  for (let page = 1; page <= pageTotal; page++) {
    pages.push(<p key={page} >
      <button className="black" to="#" onClick={(event) => { handlePage(event, perPage, page); }}>
        {page}
      </button>
    </p>);
  }
  return (
    <div className="paginate">
        Pages: {pages}
    </div>
  );
};
export default Pagination;
