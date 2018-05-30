import { Component, NgModule, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './api.service';
import { log } from 'util';
import { NgModel } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Node CRUD Project.';
  form;
  updateMode = false;
  data: any[];
  name ;
  uname ;
  pwd = '';
  mb = '';
  formdata;

  constructor( private apiService: ApiService) { }

  getUsers() {
    this.apiService.getUsers().subscribe(jsonData => {
      this.data = jsonData.json();
      // console.log(this.data);
    });
  }

  addUser() {
    console.log(this);
    const userData = {name : this.name, username : this.uname, password : this.pwd, mobile : this.mb};
    console.log(userData);
    this.apiService.addUser(userData).subscribe(jsonData => {
     // this.data = jsonData.json();
    // console.log(this.data);
      this.getUsers();
    });
  }

  editRow(index) {
    console.log(index, this);
    this.data[index].updateMode = !this.data[index].updateMode;
  }

  updateUser(user) {
    // console.log(user);
    user.updateMode = false;
    this.apiService.updateUser(user).subscribe(jsonData => {
      // this.data = jsonData.json();
      // console.log(jsonData.json());
      this.getUsers();
    });
  }

  deleteUser(id) {
    console.log(id);
    this.apiService.deleteUser(id).subscribe(jsonData => {
      // this.data = jsonData.json();
      // console.log(this.data);
      this.getUsers();
    });
  }

  submit(myForm) {
    console.log(this.form);
    const userData = {name : myForm.value.name, username : myForm.value.uname, password : myForm.value.pwd, mobile : myForm.value.mb};
    console.log(userData);

    this.apiService.addUser(userData).subscribe(jsonData => {
     // this.data = jsonData.json();
    // console.log(this.data);
      this.getUsers();
      myForm.reset();
    });
  }

  ngOnInit() {
    this.getUsers();

    this.formdata = new FormGroup({
      name: new FormControl(''),
      uname: new FormControl(''),
      pwd: new FormControl(''),
      mb: new FormControl('')
   });
  }
}
