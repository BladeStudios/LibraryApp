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
  userDisplayName='';

  constructor(private Auth: AuthService) { }

  ngOnInit(){
    this.userDisplayName = JSON.parse(localStorage.getItem('currentUser'));
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