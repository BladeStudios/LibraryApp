import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../test-books';

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

}
