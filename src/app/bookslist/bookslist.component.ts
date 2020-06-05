import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../test-books';
import { Book } from '../book';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {

  books = BOOKS;

  constructor() { }

  ngOnInit() {
  }

  onBorrow(book: Book){
    book.borrowed = true;
  }

  onReturn(book: Book){
    book.borrowed = false;
  }

}
