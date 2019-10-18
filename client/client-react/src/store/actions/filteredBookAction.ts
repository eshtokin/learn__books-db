import { Book } from "../../models/book.model";
import { SET_BOOK, TOGGLE_FAVORITE_FLAG } from "../constants/filteredBookConstant";
import BookService from "../../service/books.service";
import UserService from "../../service/users.service";
import UserInfoService from "../../service/user-info.service";
import { User } from "../../models/user.model";
import { PaginationEvent } from "../../models/pagination-event.model";
import queryString from 'query-string';
import { saveError } from "./micromodalAction";

const bookService = BookService;
const userService = UserService;
const userInfoService = UserInfoService;

export function setBook(listOfBook: Book[]) {
  return {
    type: SET_BOOK,
    payload: listOfBook
  }
}

export const favoriteFlagToggle = (bookId: string) => {
  return {
    type: TOGGLE_FAVORITE_FLAG,
    payload: bookId
  }
}

export const editeBook = (book: Book) => {
  return async (dispatch: any) => {
    try {
      const response = await bookService.updateBook(book)
      if (response.status === 200) {
        alert('book was updated');
      }
    } catch(error) {
      dispatch(
        saveError({
          status: error.response.status,
          message: error.response.data.message
        })
      )
    }
  }
}

export const deleteBook = (book: Book) => {
  return async (dispatch: any) => {
    try {
      const response = await bookService.deleteBook(book)
      if (response.status === 200) {
        alert('book was deleted');
      }
    } catch(error) {
      dispatch(
        saveError({
          status: error.response.status,
          message: error.response.data.message
        })
      )
    }
  }
}

export const addDelBookFromFavorite = (book: Book) => {
  return async (dispatch: any) => {
    try {
      if (book.inFavorite) {
        let restOfBook: string[] = [];
        const listOfFavoritesBooks = await userService.getUserFavoriteBooks()
        restOfBook = listOfFavoritesBooks.filter((id: string) => {
          return id !== book._id
        })
        const user = await userService.getUser((userInfoService.getCurrentUser() as User).id as string)
        user.books = restOfBook
        const responseFromEdite = await userService.edit(user._id, user)
        if (responseFromEdite.status === 200) {
          dispatch(favoriteFlagToggle(book._id as string))
        }
      } else {
        const addBookResponse = await userService.addBookToProfile(book)
        if (addBookResponse.status === 200) {
          dispatch(favoriteFlagToggle(book._id as string))
        }
      }
    } catch(error) {
      dispatch(
        saveError({
          status: error.response.status,
          message: error.response.data.message
        })
      )
    }
  }
}

export const getSomeBooks = (searchString: string, pagination: PaginationEvent) => {
  return async (dispatch: any) => {
    try {
      const linkParams = queryString.parse(searchString);
      const data = {
        'authors[]': linkParams.authors as string[] || [],
        'categories[]': linkParams.categories as string[] || [],
        title: linkParams.title as string || '',
        pagination: pagination
      };
      const user = await userService.getUser((userInfoService.getCurrentUser() as User).id as string)
      const responseWithBook = await bookService.getSomeBooks(data);
      let favoritesId = user.books as string[];
      if (responseWithBook.data[0].totalCount[0]) {
        pagination.length = responseWithBook.data[0].totalCount[0].count;
      }
      
      const listOfBook = (responseWithBook.data[0].listOfItem as Book[]).map((book: Book) => {
        return {
          ...book,
          inFavorite: (favoritesId as string[]).indexOf(book._id as string) === -1 ? false : true
        };
      })
      dispatch(setBook(listOfBook));
    } catch(error) {
      dispatch(
        saveError({
          status: error.response.status,
          message: error.response.data.message
        })
      )
    }
  }
}