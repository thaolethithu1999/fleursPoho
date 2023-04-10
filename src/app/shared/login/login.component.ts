import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private apiService: ApiService,
    private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  public onSubmit() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.get('username').value);
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value
    const loginInfo = { username, password };
    this.apiService.login(loginInfo).subscribe((res: any) => {
      console.log(res);
      if (res.user.length < 1) {
        this.errorMessages.push("Not found user in our system. Please check your username and password!");
      } else {
        sessionStorage.setItem('user_id', res.user.id);
        this.router.navigate(['']);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
   

  }

  handleCloseError() {
    this.errorMessages = [];
  }

}
