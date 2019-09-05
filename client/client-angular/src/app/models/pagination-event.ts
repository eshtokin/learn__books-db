export interface PaginationEvent {
  pageSize: number;
  pageIndex: number;
  length?: number;
  previousPageIndex?: number;
}
