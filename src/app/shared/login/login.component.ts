import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessages: string[] = [];
  confirmSuccess: Boolean = false;

  constructor(private apiService: ApiService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  public onSubmit() {
    console.log(this.loginForm.value);

  }

  handleCloseError() {
    this.errorMessages = [];
  }

}
