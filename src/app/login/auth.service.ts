import { Injectable, OnInit } from '@angular/core';
import { User, UserLogin } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  db:any = localStorage.getItem('infos');
  users:User[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.db = localStorage.getItem('infos');
    this.users = JSON.parse(this.db);
  }

  updateUsers() {
    this.db = JSON.stringify(this.users);
    localStorage.setItem('infos', this.db);
  }

  createAccount(infos: User){
    if(this.verifyExits(infos)) {
      return '409';
    }else{
      this.users.push(infos);
      this.updateUsers();
      return '201'
    }
  }

  verifyExits(infos: User) {
    let result = false;
    this.users.forEach(user => {
      if (user.email == infos.email) {
        result = true;
      }else if(user.username == infos.username) {
        result = true;
      }
    });
    return result;
  }

  login(infos: UserLogin) {
    this.getUsers();
    let result = false;
    this.users.forEach(user => {
      if (user.email == infos.email && user.password == infos.password) {
        result = true;
      }
    });
    return result;
  }

}
