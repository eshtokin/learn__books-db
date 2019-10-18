import Axios from 'axios';
import BookService, { BookServiceClass } from './books.service';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';

export class GoogleBooks {
  private booksService: BookServiceClass

  constructor() {
    this.booksService = BookService;
    this.pageInfo = {
      searchResult: '',
      currentItems: [],
      paginationParams: {
        pageIndex: 0,
        pageSize: 10,
        length: 0
      }
    };
  }

  public pageInfo: {
    searchResult: string,
    currentItems: Book[],
    paginationParams: PaginationEvent
  };

  async searchForBook(searchString: string): Promise<Book[]> {
    if (searchString.trim().length > 0) {
      const searchStr = searchString.replace(' ', '%20');
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchStr}`
      
      this.pageInfo.searchResult = searchString;
      const pagination = this.pageInfo.paginationParams;
      const params = {
        startIndex: pagination.pageSize * pagination.pageIndex,
        maxResults: pagination.pageSize
      };
      
      return await Axios.get(url, {params})
        .then(res => {
          console.log(res);
          
          this.pageInfo.paginationParams.length = Math.round(res.data.totalItems / 4);
          
          const industryIdentifiersArray: string[] = res.data.items.map((book: any) => { // response from GooleBook
            if (book.volumeInfo.industryIdentifiers) {
              return book.volumeInfo.industryIdentifiers.map((el: {type: string, identifier: string}) => el.type + el.identifier).join('')
            } else {
              return 'dontHvaeIndustryIdentifiers'
            }
          });
          
          return this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray)
          .then((res) => {
            const arrayIdBookInBd = res.data.map((book: Book) => {
              return book.industryIdentifiers;
            });
            this.pageInfo.currentItems = res.data.map((el: any): Book => { // el - response from GooleBook;
              
              let industryIdentifiers;
              console.log('el.industryIdentifiers', res.data);
              
              if (el.data.items.industryIdentifiers) {
                industryIdentifiers = el.industryIdentifiers.map((obj: {type: string, identifier: string}) => {
                  return obj.type + obj.identifier;
                }).join('');
              }
              
              return {
                alreadyExistInBD: arrayIdBookInBd.indexOf(industryIdentifiers) === -1 ? false : true,
                _id: industryIdentifiers, // this is change
                ...el.volumeInfo
              };
            });
            return this.pageInfo.currentItems;
          });
        })
      }
      return await new Promise((resilve, reject) => {});
    }
    
    public getPageInfo() {
      return this.pageInfo;
  }

}

const GoogleBookService = new GoogleBooks();
export default GoogleBookService;