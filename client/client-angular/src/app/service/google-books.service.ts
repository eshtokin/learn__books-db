import Axios from 'axios';
import { BookService } from './books.service';

export class GoogleBooks {
  constructor(
    private booksService: BookService
  ) {}

  pageInfo = {
    serchResult: '',
    currentItems: [],
    paginationParams: {
      pageIndex: 0,
      pageSize: 10,
      length: 0,
      previousPage: 0
    }
  };

  async searchForBook(searchString: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchString}`;
    this.pageInfo.serchResult = searchString;
    const pagination = this.pageInfo.paginationParams;
    const params = {
      startIndex: pagination.pageSize * pagination.pageIndex,
      maxResults: pagination.pageSize
    };

    return await Axios.get(url, {params})
      .then(res => {
        console.log('google res: ', res);

        this.pageInfo.paginationParams.length = res.data.totalItems / 4;

        const industryIdentifiersArray = res.data.items.map(book => {
          return book.volumeInfo.industryIdentifiers.map(el => el.type + el.identifier).join('');
        });

        return this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray)
        .then(bookInBd => {
          const arrayIdBookInBd = bookInBd.map(el => {
            return el.industryIdentifiers;
          });

          this.pageInfo.currentItems = res.data.items.map(el => {
            const industryIdentifiers = el.volumeInfo.industryIdentifiers.map((obj: {type: string, identifier: string}) => {
            return obj.type + obj.identifier;
            }).join('');

            return {
              alreadyExistInBD: arrayIdBookInBd.indexOf(industryIdentifiers) === -1 ? false : true,
              ...el.volumeInfo,
            };
          });
          return this.pageInfo.currentItems;
        });
      })
      .catch(err => console.log(err));
  }

  getPageInfo() {
    return this.pageInfo;
  }
}
