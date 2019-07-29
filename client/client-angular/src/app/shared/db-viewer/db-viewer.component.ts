import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BookService } from 'src/app/service/books.service';

@Component({
  selector: 'app-db-viewer',
  templateUrl: './db-viewer.component.html',
  styleUrls: ['./db-viewer.component.scss']
})

export class DbViewerComponent implements OnInit {
  image;
  books;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.init();
    // console.log(SortBy);
  }

  init() {
    this.bookService.getAllBooks().then(el => {
      this.books = el.slice();
      console.log('oninit ', this.books);
    });
  }

  uploadFile(e, id) {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
      console.log(this.image, this.image.indexOf(','));
      this.changeBookImg(id, this.image);
    };
    reader.readAsDataURL(input.files[0]);
  }

  changeBookImg(id, image) {
    console.log('image', image.length);
    this.bookService.changeImageInBook({id, image});
  }

  show(message) {
    console.log(message);
  }
}
