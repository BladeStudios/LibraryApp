import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { User } from '../user';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {
  books: Book[];
  newBook: Book = new Book();
  authorsearch: string;
  titlesearch: string;
  yearsearch: number;
  userDisplayName: User;

  constructor(private bookService: BookService) {
   }

  ngOnInit() {
    this.getBooks();
    this.userDisplayName = JSON.parse(sessionStorage.getItem('currentUser'));
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

  SearchAuthor(){
    if(this.authorsearch != "")
    {
      this.books = this.books.filter(res=>{
        return res.author.toLocaleLowerCase().
        match(this.authorsearch.toLocaleString().toLocaleLowerCase());
      })
    }else if (this.authorsearch == ""){
      this.ngOnInit();
    }
  }

  SearchTitle(){
    if(this.titlesearch != "")
    {
      this.books = this.books.filter(res=>{
        return res.title.toLocaleLowerCase().
        match(this.titlesearch.toLocaleString().toLocaleLowerCase());
      })
    }else if (this.titlesearch == ""){
      this.ngOnInit();
    }
  }

  SearchYear(){
    if(this.yearsearch == null)
    {
      this.ngOnInit();
      
    }else if (this.yearsearch.toString() != ""){
      this.books = this.books.filter(res=>{
        return res.year.toString().toLocaleLowerCase().
        match(this.yearsearch.toLocaleString().toLocaleLowerCase());
      })
    }
  }

}
