import { Book } from "./book.model";

export interface GoogleResponce {
  accessInfo: object;
  etag: string;
  id: string;
  kind: string;
  saleInfo: object
  searchInfo: object;
  selfLink: string;
  volumeInfo: Book;
}