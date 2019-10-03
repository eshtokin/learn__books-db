import { SET_BOOK_AT_PAGE, TOGGLE_FAVORITE_FLAG } from "../constants/bookManagerConstant"
import { Book } from "../../models/book.model"
import { PaginationEvent } from "../../models/pagination-event.model"
import UserService from "../../service/users.service"
import BookService from "../../service/books.service";
import UserInfoService from "../../service/user-info.service";
import { User } from "../../models/user.model";

const userService = UserService;
const bookService = BookService;
const userInfoService = UserInfoService;

export const setBookAtPage = (listOfBook: Book[]) => {
  return {
    type: SET_BOOK_AT_PAGE,
    payload: listOfBook
  }
}

export const favoriteFlagToggle = (bookId: string) => {
  return {
    type: TOGGLE_FAVORITE_FLAG,
    payload: bookId
  }
}

export const getAllBooks = (pagination: PaginationEvent) => {
  return async (dispatch: any) => {
    await bookService.getAllBooks(pagination)
    .then((el) => {
      if (el.listOfItem.length) {
        userService.getUserFavoriteBooks()
        .then((favoriteBooks) => {
          dispatch(setBookAtPage(
            (el.listOfItem as Book[]).map(book => {
              return {
                ...book,
                inFavorite: favoriteBooks.indexOf(book._id as string) === -1 ? false : true
              }
            })
          ))
        })
        pagination.length = el.totalCount[0].count;
      }
    })
  }
}

export const deleteBookFromDb = (book: Book) => {
  return async () => {
    await bookService.deleteBook(book)
    .then(response => {
      if (response.status === 200) {
        alert('book was deleted');
      }
    })
  }
}

export const addDelBookFromFavorite = (book: Book) => {
  return async (dispatch: any) => {
    if (book.inFavorite) {
      let restOfBook: string[] = [];
      await userService.getUserFavoriteBooks()
      .then(list => {
        if (!list) {
          return list;
        }
        restOfBook = list.filter((id: string) => {
          return id !== book._id
        })
      
        userService.getUser((userInfoService.getCurrentUser() as User).id as string)
        .then(user => {
          user.books = restOfBook
          userService.edit(user._id, user)
          .then((response) => {
            if (response.status === 200) {
              dispatch(favoriteFlagToggle(book._id as string))
            }
          })
        })
      });
    } else {
      await userService.addBookToProfile(book)
      .then(response => {
        if (response.status === 200) {
          dispatch(favoriteFlagToggle(book._id as string)) 
        }
      })
    }
  }
}

export const editeBook = (book: Book) => {
  return async () => {
    await bookService.updateBook(book)
  }
}