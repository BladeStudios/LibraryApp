import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {
  books: Book[];
  newBook: Book = new Book();

  constructor(private bookService: BookService) {
   }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  updateBook(book: Book){
    this.bookService.updateBook(book).subscribe();
  }

  onDelete(book: Book): void{
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }

  onAdd(newauthor: string, newtitle: string, newyear: number){
    if(!newauthor || !newtitle || !newyear){return;}
    this.newBook.author = newauthor;
    this.newBook.title = newtitle;
    this.newBook.year = newyear;
    this.newBook.rent = false;
    this.bookService.addBook(this.newBook).subscribe(response=>{this.ngOnInit()});
  }

  onBorrow(book: Book){
    book.rent = true;
    this.updateBook(book);
  }

  onReturn(book: Book){
    book.rent = false;
    this.updateBook(book);
  }

}
