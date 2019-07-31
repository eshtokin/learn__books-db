import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { SortType } from '../../models/sort-type.model';

@Component({
  selector: 'app-db-viewer',
  templateUrl: './db-viewer.component.html',
  styleUrls: ['./db-viewer.component.scss']
})
export class DbViewerComponent implements OnInit {
  image: string | ArrayBuffer;

  books: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooksWithSort();
  }

  getBooksWithSort(sortType: SortType = {title: -1}) {
    this.bookService.getAllBooks(sortType).then(el => {
      this.books = el.slice();
    });
  }

  uploadFile(e, id: string) {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
      this.changeBookImg(id, this.image);
    };
    reader.readAsDataURL(input.files[0]);
  }

  changeBookImg(id: string, image: string | ArrayBuffer) {
    this.bookService.changeImageInBook({id, image});
  }
}
