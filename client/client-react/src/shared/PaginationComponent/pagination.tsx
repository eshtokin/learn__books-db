import React from 'react';
import Pagination from 'rc-pagination';
import './style.scss';
import 'rc-pagination/assets/index.css';

import { PaginationEvent } from '../../models/pagination-event.model';

interface Props {
  pagination: PaginationEvent;
  onPageSizeChange: (pageSize: number) => void;
  callback: (current: number, pageSize: number) => void;
}

export default function PaginationComponent(props: Props) {
  return (
    <div className="row pagination">
      <Pagination
      showSizeChanger
      pageSize={props.pagination.pageSize}
      defaultCurrent={1}
      total={props.pagination.length}
      onChange = {(current, pageSize) => props.callback(current, pageSize)}
      />
      <label htmlFor="pageSize">
        <select name="pageSize" id="pageSize"
        onChange={event => props.onPageSizeChange(+event.target.value)}
        defaultValue={'' + props.pagination.pageSize}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        Page size
      </label>
      
    </div>
  )
}