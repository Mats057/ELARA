import { Injectable, OnInit } from '@angular/core';
import { User, UserLogin } from '../shared/user';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private readonly API = environment.API;
  users: User[] = [];
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getUser(token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    return this.http.get<User>(`${this.API}getUser.php`, { headers: headers }).pipe(
      tap({
        next: (data: User) => {
          if(!data){
            throw new Error(data['message']);
          }
        },
      }),
      take(1));
  }

  updateUser(token: string, infos: User) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    return this.http.post(`${this.API}updateUser.php`, infos, { headers: headers, observe: 'response',
  })
  .pipe(
    tap({
      next: (data: HttpResponse<any>) => {
        if (data.body['message'] == 'User updated' && data.status == 200) {
          let token: string = (data as HttpResponse<any>).headers.get(
            'Authorization'
          )!;
          localStorage.setItem('token', token);
        }else{
          throw new Error(data.body['message']);
        }
      },
    }),
    take(1)
  );
  }

  createAccount(infos: User) {
    let data = JSON.stringify(infos);
    return this.http
      .post(`${this.API}createUser.php`, data, { headers: this.headers })
      .pipe(take(1));
  }

  verifyToken(token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(`${this.API}verifyToken.php`, null, { headers: headers })
  }

  login(infos: UserLogin) {
    let data = JSON.stringify(infos);
    return this.http
      .post(`${this.API}verifyAccess.php`, data, { headers: this.headers, observe: 'response' })
      .pipe(
        tap({
          next: (data: HttpResponse<any>) => {
            if (data.body['message'] == 'Login realizado com sucesso!') {
              let token:string = ((data as HttpResponse<any>).headers.get('Authorization'))!;
              localStorage.setItem('token', token);
            }
          },
        }),
        take(1)
      );
  }

  deleteUser(token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    return this.http.delete(`${this.API}deleteUser.php`, { headers: headers }).pipe(
      tap({
        next: (data: any) => {
          if(data.message != 'User deleted'){
            throw new Error(data['message']);
          }
        },
      }),
      take(1));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
