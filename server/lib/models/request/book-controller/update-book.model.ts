import Book from "models/book.model";

export default interface UpdateBookRequest {
  query: {
    book: Book
  }
}