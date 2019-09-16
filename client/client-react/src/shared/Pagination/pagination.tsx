import React from 'react';
import { PaginationEvent } from '../../models/pagination-event.model';
import './style.scss';

export function Pagination(props: PaginationEvent) {
  return (
    <ul className="pagination">
      {/* <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li> */}
      <li className="active"><a href="#!">1</a></li>
      <li className="waves-effect"><a href="#!">2</a></li>
      <li className="waves-effect"><a href="#!">3</a></li>
      <li className="waves-effect"><a href="#!">4</a></li>
      <li className="waves-effect"><a href="#!">5</a></li>
      {/* <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li> */}
      <li className="waves-effect">
        <select name="pageSize" id="pageSize">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </li>
    </ul>
  )
}