import UserInterface from "./user.mdoel";
import { TotalCount } from "./total-count.model";
import AuthorAndCategory from "./author-and-category.model";
import Book from "./book.model";

export interface AgreagationUserResponse {
  listOfItem: UserInterface[];
  totalCount: TotalCount[];
}

export interface AgreagationBookResponse {
  listOfItem: Book[];
  totalCount: TotalCount[];
}