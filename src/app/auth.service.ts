import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://apilibary.azurewebsites.net/api/login/login';
  private logoutUrl = 'http://apilibary.azurewebsites.net/api/login/logout';
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<User>
    (JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<any>(this.loginUrl,{username, password})
      .subscribe(user => {
        //console.log("server info: ", JSON.stringify(user));
        if(user)
        {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          window.location.reload();
        }
        else
        {
          window.alert("Błędne dane logowania!");
        }
      })
  }

  logout(username: string, password: string) {
    //remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post<any>(this.logoutUrl,{username, password})
      .subscribe(data => {
        
        console.log("server info: ", JSON.stringify(data));
        if(data==true)
        {
          console.log("Poprawnie wylogowano");
        }
        else
        {
          console.log("Błąd wylogowywania!");
        }
      })
  }


  /*
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedin') || 'false');

  constructor(private http: HttpClient) { }
 
 get isLoggedIn(){
   return JSON.parse(localStorage.getItem('loggedin') || this.loggedInStatus.toString());
 }

 setLoggedIn(value: boolean){
   this.loggedInStatus = value;
   localStorage.setItem('loggedin', value.toString());
 }

  getUserDetails(username, password) {
    //post these details to API
    return this.http.post(this.loginUrl, {
      username,
      password
    }).subscribe(data => {
      if(data==true)
      {
        console.log("server info: ", data);
      }
      else
      {
        console.log("server info: ", data);
        window.alert("Błędne dane logowania!");
      }
    })
  }*/
}
