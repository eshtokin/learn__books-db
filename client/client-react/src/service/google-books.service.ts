import Axios from 'axios';
import { BookService } from './books.service';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
// import { identifier } from '@babel/types';

export default class GoogleBooks {
  constructor(
    private booksService: BookService
  ) {
    this.booksService = new BookService();
    this.pageInfo = {
      searchResult: '',
      currentItems: [],
      paginationParams: {
        pageIndex: 0,
        pageSize: 10,
        length: 0,
        previousPageIndex: 0
      }
    };
  }

  public pageInfo: {
    searchResult: string,
    currentItems: Book[],
    paginationParams: PaginationEvent
  };

  async searchForBook(searchString: string): Promise<any> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchString}`

    this.pageInfo.searchResult = searchString;
    const pagination = this.pageInfo.paginationParams;
    const params = {
      startIndex: pagination.pageSize * pagination.pageIndex,
      maxResults: pagination.pageSize
    };

    return await Axios.get(url, {params})
      .then(res => {
        this.pageInfo.paginationParams.length = res.data.totalItems / 4;

        const industryIdentifiersArray: string[] = res.data.items.map((book: any): Book[] => { // change any type
          return book.volumeInfo.industryIdentifiers.map((el: {type: string, identifier: string}) => el.type + el.identifier).join('');
        });

        return this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray)
        .then((bookInBd: Book[]) => {
          const arrayIdBookInBd = bookInBd.map((book) => {
            return book.industryIdentifiers;
          });

          this.pageInfo.currentItems = res.data.items.map((el: any): Book => {
            const industryIdentifiers = el.volumeInfo.industryIdentifiers.map((obj: {type: string, identifier: string}) => {
            return obj.type + obj.identifier;
            }).join('');

            return {
              alreadyExistInBD: arrayIdBookInBd.indexOf(industryIdentifiers) === -1 ? false : true,
              ...el.volumeInfo
            };
          });
          return this.pageInfo.currentItems;
        });
      })
      .catch(err => console.log(err));
  }

  public getPageInfo() {
    return this.pageInfo;
  }
}