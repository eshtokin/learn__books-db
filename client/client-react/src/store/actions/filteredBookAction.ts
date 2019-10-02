import { Book } from "../../models/book.model";
import { SET_BOOK, TOGGLE_FAVORITE_FLAG } from "../constants/filteredBookConstant";
import BookService from "../../service/books.service";
import UserService from "../../service/users.service";
import UserInfoService from "../../service/user-info.service";
import { User } from "../../models/user.model";
import { PaginationEvent } from "../../models/pagination-event.model";
import queryString from 'query-string';

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
  return async () => {
    await bookService.updateBook(book)
      .then(async(response) => {
        if (response.status === 200) {
          alert('book was updated');
        }
      })
  }
}

export const deleteBook = (book: Book) => {
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
          restOfBook = list.filter((id: string) => {
            return id !== book._id
          })
          userService.getUser((userInfoService.getCurrentUser() as User).id as string)
            .then(user => {
              user.books = restOfBook
              userService.edit(user._id, user)
                .then(response => {
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

export const getSomeBooks = (searchString: string, pagination: PaginationEvent) => {
  return async (dispatch: any) => {
    const linkParams = queryString.parse(searchString);
    const data = {
      'authors[]': linkParams.authors as string[] || [],
      'categories[]': linkParams.categories as string[] || [],
      title: linkParams.title as string || '',
      pagination: pagination
    };
    await userService.getUser((userInfoService.getCurrentUser() as User).id as string)
    .then(async (user: User) => {
      await bookService.getSomeBooks(data)
      .then(async (el) => {
        let favoritesId = user.books as string[];
        pagination.length = el[0].totalCount[0].count;

        const listOfBook = (el[0].listOfItem as Book[]).map((book: Book) => {
          return {
            ...book,
            inFavorite: (favoritesId as string[]).indexOf(book._id as string) === -1 ? false : true
          };
        })
        dispatch(setBook(listOfBook));
      });
    });
  }
}