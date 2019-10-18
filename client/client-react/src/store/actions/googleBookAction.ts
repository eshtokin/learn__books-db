import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';
import BookService from '../../service/books.service';
import GoogleBookService from '../../service/google-books.service';
import { saveError } from './micromodalAction';

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
    try {
      const googleBookResponse = await googleBookService.searchForBook(value)
      console.log('googleBookRespons' ,googleBookResponse);
      
      dispatch(setBooksAtPage(googleBookResponse));
    } catch (error) {
      console.log(error);
      
      // console.log('JSON parse', error)
      // dispatch(
      //   saveError({
      //     status: error.response.status,
      //     message: error.response.data.message
      //   })
      // )
    }
  }
}

export const addBookToDb = (book: Book) => {
  return async (dispatch: any) => {
    try {
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
    } catch(error) {
      console.log(error);
      for (const props in error) {
        console.log(props);
        
      }
      
      // dispatch(
      //   saveError({
      //     status: error.response.status,
      //     message: error.response.data.message
      //   })
      // )
    }
  }
}