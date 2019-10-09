import { Pagination } from "models/pagination.model";

export default interface GetUserBooksRequest {
  query: {
    params: {
      books: string[],
      pagination: string,
      title?: string,
    }
  }
}