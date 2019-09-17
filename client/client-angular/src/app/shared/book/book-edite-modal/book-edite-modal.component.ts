import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/books.service';
import { CategoryAuthor } from 'src/app/models/category-author.model';

@Component({
  selector: 'app-book-edite-modal',
  templateUrl: './book-edite-modal.component.html',
  styleUrls: ['./book-edite-modal.component.scss']
})
export class BookEditeModalComponent implements OnInit {
  public editeBookData: Book;
  public dropdownAuthorsList: CategoryAuthor[];
  public selectedItemsAuthor: CategoryAuthor[];
  public dropdownCategoriesList: CategoryAuthor[];
  public selectedItemsCategories: CategoryAuthor[];
  public dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      book: Book
      reloadPage: () => void
    },
    public editeFormDialog: MatDialogRef<BookEditeModalComponent>,
    public bookService: BookService
  ) {
    this.editeBookData =  {
      title: this.data.book.title,
      authors: [],
      categories: [],
      pageCount:  this.data.book.pageCount,
      description:  this.data.book.description,
      industryIdentifiers:  this.data.book.industryIdentifiers,
      image:  this.data.book.image,
      printType:  this.data.book.printType
    };
  }

  ngOnInit() {
    this.bookService.getAllAuthors()
    .then((authors: CategoryAuthor[]) => {
      this.dropdownAuthorsList = authors;
    });
    this.bookService.getAllCategories()
    .then(categories => {
      this.dropdownCategoriesList = categories;
    });

    this.selectedItemsAuthor = this.data.book.authors_list as CategoryAuthor[];
    this.selectedItemsCategories = this.data.book.categories_list as CategoryAuthor[];
  }

  public editeBook(): void {
    this.editeBookData.authors = this.selectedItemsAuthor.map(author => author.name);
    this.editeBookData.categories = this.selectedItemsCategories.map(category => category.name);
    this.bookService.updateBook(this.editeBookData)
    .then(() => {
      console.log(this.editeBookData);
      this.editeFormDialog.close();
      this.data.reloadPage();
    });
  }

  public close(): void {
    this.editeFormDialog.close();
  }

  public uploadFile(e): void {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.editeBookData.image = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
