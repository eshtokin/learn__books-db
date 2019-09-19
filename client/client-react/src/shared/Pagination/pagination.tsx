import React from 'react';
import { PaginationEvent } from '../../models/pagination-event.model';
import './style.scss';
import pag from 'rc-pagination';
// const pagin = require("rc-pagination");

export function Pagination(props: PaginationEvent) {
  return (
    <div className="pagination row">
      <div className="page-size-action offset-s6 col s2">
        <label htmlFor="pageSize">Items per page</label>
        <select name="pageSize" id="pageSize">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="range-actgion col s4">
        <ul className="pageNumbers">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>
  )
}