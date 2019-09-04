import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { UserInfo } from '../../service/user-info.service';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string;
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public currentPage: number = this.googleBooks.getPageInfo().currentPage;
  public arrayBookInDB: any = [];

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService
    ) { }

  ngOnInit() {}

  public searchForBook(searchString: string, configForBookReq: {startIndex: number, maxResults: number}) {
    this.googleBooks.searchForBook(searchString, configForBookReq)
    .then((result: any) => {
      const industryIdentifiersArray = [];
      result.data.items.forEach(book => {
        industryIdentifiersArray.push(book.volumeInfo.industryIdentifiers);
      });
      console.log(industryIdentifiersArray);

      this.booksService.getBookByIndustryIdentifiers(industryIdentifiersArray)
      .then(data => {
        this.arrayBookInDB = data;
        console.log(this.arrayBookInDB);

        this.listOfBook = this.listOfBook.map(el => {
          // console.log(industryIdentifiersArray.indexOf(
          //   {0: {type: 'ISBN_13', identifier: '9781473211612'}, 1: {type: 'ISBN_10', identifier: '1473211611'}}
          //   ));

          const newId = el.industryIdentifiers.map(ind => {
            return `type${ind.type}identifier${ind.identifier}`;
          });
          return {
            alreadyExistInBD: industryIdentifiersArray.indexOf(newId),
            newId,
            ...el,
          };
        });
        console.log('list of book : ', this.listOfBook);

      });
    });
    this.currentPage  = configForBookReq.startIndex;
  }

  public changePage(page: number) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }
}
