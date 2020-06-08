import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'https://apilibary.azurewebsites.net/api/book';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: //new HttpHeaders({ 'Content-Type': 'application/json' }),
             new HttpHeaders({'Authorization': this.getToken()})
  };

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl,this.httpOptions);
  }

  updateBook(book: Book): Observable<any>{
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => console.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => console.log(`added book title=${book.title}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  public getToken(){
    return JSON.parse(sessionStorage.getItem('currentUser')).token;
  }
}
