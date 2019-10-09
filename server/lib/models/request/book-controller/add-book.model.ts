import Book from "models/book.model";

export default interface AddBookRequest {
  body: {
    book: Book
  }
}