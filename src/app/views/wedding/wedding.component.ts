import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.less']
})
export class WeddingComponent implements OnInit {
  enquiryForm: any;
  errorMessages: string[] = [];
  confirmSuccess: Boolean = false;

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      message: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    let errors = this.checkError();
    
    if(errors.length > 0) {
      this.errorMessages = errors;
    } else {
      this.confirmSuccess = true;
    }

    //save to db

  }

  handleCloseError() {
    this.errorMessages = []
  }

  checkError() {
    let errorMessages = [];
    
    if (this.enquiryForm.get('firstname').invalid) {
      errorMessages.push('First name is required')
    }
    if (this.enquiryForm.get('lastname').invalid) {
      errorMessages.push('Last name is required')
    }
    if (this.enquiryForm.get('email').errors) {
      if(this.enquiryForm.get('email').errors.required) {
        errorMessages.push('Email is required')
      }
      if (this.enquiryForm.get('email').errors.email) {
        errorMessages.push('Provide valid email format')
      }
    } 
    if(this.enquiryForm.get('phone').errors) {
      let phone = this.enquiryForm.get('phone').value;
      if(phone.charAt(0) !== '0') {
        errorMessages.push('Phone number must start with 0')
      }
      if (this.enquiryForm.get('phone').errors.required) {
        errorMessages.push('Phone number is required')
      }
      if(this.enquiryForm.get('phone').errors.maxlength) {
        errorMessages.push('Phone number is required 10 digits')
      }
    }
    if (this.enquiryForm.get('message').invalid) {
      errorMessages.push('Message is required')
    }
    
    return errorMessages;
  }

}
