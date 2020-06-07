import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;

    this.Auth.login(username,password);
    //console.log(username, password);
  }

}
