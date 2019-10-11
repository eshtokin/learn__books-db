import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';
import BookService from '../../service/books.service';
import GoogleBookService from '../../service/google-books.service';

const bookService = BookService;
const googleBookService = GoogleBookService;

export const setBooksAtPage = (listOfBook: Book[]) => {
  return {
    type: googleBookConstant.SET_BOOKS_AT_PAGE,
    payload: listOfBook
  }
}

export const toggleFlagExistInDB = (bookId: string) => {
  return {
    type: googleBookConstant.TOGGLE_FLAG_EXIST_IN_DB,
    payload: bookId
  }
}

export const getBookByValue = (value: string) => {
  return async (dispatch: any) => {
    const googleBookresponse = await googleBookService.searchForBook(value)
    dispatch(setBooksAtPage(googleBookresponse));
  }
}

export const addBookToDb = (book: Book) => {
  return async (dispatch: any) => {
    const newBook: Book = {
      title: book.title,
      authors: book.authors,
      categories: book.categories || [],
      description: book.description,
      image: (book.imageLinks as {thumbnail: string}).thumbnail || '',
      pageCount: book.pageCount,
      printType: book.printType,
      industryIdentifiers: book.industryIdentifiers
    };
    
    const addBookResponse = await bookService.addBookToDB(newBook)
    if (addBookResponse.status === 200) {
      alert('Book was added to DB');
      dispatch(toggleFlagExistInDB(book._id as string));
    }
  }
}