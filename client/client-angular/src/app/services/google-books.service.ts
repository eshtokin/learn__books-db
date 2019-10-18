import Axios from 'axios';
import { BookService } from './books.service';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { environment } from '../../environments/environment';

export class GoogleBooks {
  constructor(
    private booksService: BookService
  ) {
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

  public async searchForBook(searchString: string): Promise<any> {
    if (searchString.trim().length > 0) {
      const searchStr = searchString.replace(' ', '%20');
      const url = environment.googleBookDatebase + searchStr;
      this.pageInfo.searchResult = searchStr;
      const pagination = this.pageInfo.paginationParams;
      const params = {
      startIndex: pagination.pageSize * pagination.pageIndex,
      maxResults: pagination.pageSize
      };

      const response = await Axios.get(url, {params});

      this.pageInfo.paginationParams.length = response.data.totalItems / 4;

      const industryIdentifiersArray: string[] = response.data.items.map((book): Book[] => {
        return book.volumeInfo.industryIdentifiers.map(el => el.type + el.identifier).join('');
      });

      const bookInBd = await this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray);
      const arrayIdBookInBd = bookInBd.map((book) => {
        return book.industryIdentifiers;
      });

      this.pageInfo.currentItems = response.data.items.map((el): Book => {
        const industryIdentifiers = el.volumeInfo.industryIdentifiers.map((obj: {type: string, identifier: string}) => {
          return obj.type + obj.identifier;
        }).join('');

        return {
          alreadyExistInBD: arrayIdBookInBd.indexOf(industryIdentifiers) === -1 ? false : true,
          ...el.volumeInfo
        };
      });
      return this.pageInfo.currentItems;
    }
  }

  public getPageInfo() {
    return this.pageInfo;
  }
}
