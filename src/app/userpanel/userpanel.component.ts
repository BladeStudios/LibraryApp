import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  users: User[];
  newUser: User = new User();
  usersearch: string;
  generatedpassword: string;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  updateUser(user: User){
    this.userService.updateUser(user).subscribe();
  }

  onDelete(user: User): void{
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

  onAdd(newusername: string, newpassword: string, newtype: string){
    if(!newusername || !newpassword ){return;}
    this.newUser.username = newusername;
    this.newUser.password = newpassword;
    this.newUser.type = newtype;
    this.newUser.status = "offline";
    this.userService.addUser(this.newUser).subscribe(response=>{this.ngOnInit()});
  }

  SearchUser(){
    if(this.usersearch != "")
    {
      this.users = this.users.filter(res=>{
        return res.username.toLocaleLowerCase().
        match(this.usersearch.toLocaleString().toLocaleLowerCase());
      })
    }else if (this.usersearch == ""){
      this.ngOnInit();
    }
  }

  getPassword(): void{
    this.userService.getPassword().subscribe(pw=> this.generatedpassword = pw);
  }

}
