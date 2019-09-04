import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string = this.googleBooks.getPageInfo().serchResult;
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public currentPage: number = this.googleBooks.getPageInfo().currentPage;
  public arrayBookInDB: any = [];

  public searchStringUpdate = new Subject<string>();

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService
    ) {
      this.searchStringUpdate.pipe(
        debounceTime(500)
      ).subscribe(value => {
        this.searchForBook(value, {startIndex: 0, maxResults: 10});
      });
    }

  ngOnInit() {}

  public searchForBook(searchString: string, configForBookReq: {startIndex: number, maxResults: number}) {
    this.googleBooks.searchForBook(searchString, configForBookReq)
    .then((result: any) => {
      console.log('result: ', result);
      const industryIdentifiersArray = [];
      result.data.items.forEach(book => {
        let industryIdentifiers = '';

        book.volumeInfo.industryIdentifiers.forEach((obj: {type: string, identifier: string}) => {
        industryIdentifiers += obj.type + obj.identifier;
        });

        industryIdentifiersArray.push(industryIdentifiers);
      });

      this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray)
      .then(bookInBd => {
        const arrayIdBookInBd = [];
        bookInBd.forEach(el => {
          arrayIdBookInBd.push(el.industryIdentifiers);
        });

        this.listOfBook = this.listOfBook.map(el => {
          let industryIdentifiers = '';

          el.industryIdentifiers.forEach((obj: {type: string, identifier: string}) => {
          industryIdentifiers += obj.type + obj.identifier;
          });

          return {
            alreadyExistInBD: arrayIdBookInBd.indexOf(industryIdentifiers) === -1 ? false : true,
            ...el,
          };
        });
      });

      this.listOfBook = this.googleBooks.getPageInfo().currentItems;
    });
    this.currentPage  = configForBookReq.startIndex;
  }

  public changePage(page: number) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }
}
