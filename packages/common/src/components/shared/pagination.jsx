import React from "react";
import { Pagination } from "react-bootstrap";
const ListPagination = (props) => {
  const { prev, next, list } = props;
  if (!list) return <></>;
  return (
    <div className="m-auto">
    <Pagination className="my-4 justify-content-center">
      <Pagination.Prev
        disabled={!list?.hasPrevPage}
        onClick={() => prev(list.page - 1)}
      >
        Prev
      </Pagination.Prev>
      {list?.prevPage && (
        <Pagination.Item onClick={() => prev(list.page - 1)}>
          {list.page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{list.page}</Pagination.Item>
      {list.nextPage && (
        <Pagination.Item
          onClick={() => {
            next(list.page + 1);
          }}
        >
          {list.page + 1}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={!list.hasNextPage}
        onClick={() => {
          next(list.page + 1);
        }}
      >
        Next
      </Pagination.Next>
    </Pagination>
    </div>
  );
};
export default ListPagination;
