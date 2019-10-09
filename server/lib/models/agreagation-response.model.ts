import User from "./user.mdoel";
import { TotalCount } from "./total-count.model";
import Book from "./book.model";

export interface AgreagationUserResponse {
  listOfItem: User[];
  totalCount: TotalCount[];
}

export interface AgreagationBookResponse {
  listOfItem: Book[];
  totalCount: TotalCount[];
}