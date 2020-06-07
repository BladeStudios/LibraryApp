import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'library-app';
  userDisplayName: User;

  constructor(private Auth: AuthService) { }

  ngOnInit(){
    this.userDisplayName = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log("ngoninit in app.component");
  }

  logout(username: string, password: string){
    this.Auth.logout(username,password);
    this.ngOnInit();
  }

}

/*
export class AppComponent{
  title = 'library-app';
}
*/