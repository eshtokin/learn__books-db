import { PaginationEvent } from './pagination-event.model';

export interface BookFilter {
  title?: string;
  categories?: string[];
  authors?: string[];
  pagination: PaginationEvent;
}
