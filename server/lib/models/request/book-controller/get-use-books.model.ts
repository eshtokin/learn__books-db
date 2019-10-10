import { Pagination } from "models/pagination.model";

export default interface GetUserBooksRequest {
  query: {
    books: string[],
    pagination: string,
    title?: string,
  }
}