import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  subscribeForm: any;
  hideError: Boolean = false;

  constructor(private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }


  handleSubscribe(form: any) {
    console.log(form)
  }

  handleChannge() {
    if(!this.subscribeForm.email) {
      this.hideError = true;
    }
    
  }
}
