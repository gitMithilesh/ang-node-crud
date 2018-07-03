import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  UserUrl = 'http://localhost:1200/users';
  addUserUrl = 'http://localhost:1200/add-user';
  updateUserUrl = 'http://localhost:1200/update-user';
  deleteUserUrl = 'http://localhost:1200/delete-user';
  // path = './assets/users.json';
  constructor(private http: Http) { }
  getUsers(): Observable<any> {
    console.log(this);
    return this.http.get(this.UserUrl);
  }

  addUser (userData): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const user = userData;
    return this.http.post(this.addUserUrl, user);
  }
  updateUser (user): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const userData = { id : user.id, name : user.name, username: user.username, password: user.password, mobile: user.mobile};
    console.log(userData);
    return this.http.post(this.updateUserUrl, userData);
  }
  deleteUser (id): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const userId = { userId : id};
    return this.http.post(this.deleteUserUrl, userId);
  }
}
