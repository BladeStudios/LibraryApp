import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'https://apilibary.azurewebsites.net/api/user';

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

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: //new HttpHeaders({ 'Content-Type': 'application/json' }),
             new HttpHeaders({'Authorization': this.getToken()})
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl,this.httpOptions);
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`added user name=${user.username}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  getPassword(){
    return this.http.
    get('https://apilibary.azurewebsites.net/api/user/generate',{responseType: 'text'});
  }

  public getToken(){
    if(sessionStorage.getItem('currentUser')!=null)
      return JSON.parse(sessionStorage.getItem('currentUser')).token;
    else
      return null;
  }

}
