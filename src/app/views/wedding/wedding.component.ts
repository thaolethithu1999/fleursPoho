import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enquiry } from 'src/app/services/model/enquiry';
import { ApiService } from 'src/app/services/services';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.less']
})
export class WeddingComponent implements OnInit {
  enquiryWeddingForm: any;
  enquiryCommonForm: any;
  errorMessages: string[] = [];
  confirmSuccess: Boolean = false;
  isWeddingPage: Boolean = false;
  isEventPage: Boolean = false;
  isCorporatePage: Boolean = false;

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path?.includes('wedding')) {
      this.isWeddingPage = true;
    }
    if (this.route.snapshot.routeConfig?.path?.includes('events')) {
      this.isEventPage = true;
    }
    if (this.route.snapshot.routeConfig?.path?.includes('corporate')) {
      this.isCorporatePage = true;
    }
    this.prepareForm();
  }

  prepareForm() {
    if (this.isWeddingPage) {
      this.enquiryWeddingForm = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        message: ['', [Validators.required]]
      });
    } else {
      this.enquiryCommonForm = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        companyname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(10)]],
        message: ['', [Validators.required]]
      })
    }
  }

  handleSubmit() {
    let errors = this.isWeddingPage ? this.checkError(this.enquiryWeddingForm) : this.checkError(this.enquiryCommonForm, true);

    if (errors && errors.length > 0) {
      this.errorMessages = errors;
    } else {
      let enquiry: Enquiry | any;
      if (this.isWeddingPage) {
        enquiry = this.enquiryWeddingForm.value;
      } else {
        enquiry = this.enquiryCommonForm.value;
      }
      this.apiService.addEnquiry(enquiry).subscribe((res: any) => {
        if(!res.err) {
          this.errorMessages = [];
          this.confirmSuccess = true;
        } else {
          this.errorMessages = res.err;
        }
      });
    }
  }

  handleCloseError() {
    this.errorMessages = [];
  }

  checkError(form: any, isCommonForm: Boolean = false) {
    if (form) {
      let errorMessages = [];

      if (form.get('firstname').invalid) {
        errorMessages.push('First name is required');
      }
      if (form.get('lastname').invalid) {
        errorMessages.push('Last name is required');
      }
      //email
      if (form.get('email').errors) {
        if (form.get('email').errors.required) {
          errorMessages.push('Email is required');
        }
        if (form.get('email').errors.email) {
          errorMessages.push('Provide valid email format');
        }
      }
      //phone
      if (form.get('phone').errors && form.get('phone').errors.required) {
        errorMessages.push('Phone number is required');
      } else {
        let phone = form.get('phone').value.toString();
        if (phone.length > 10 || phone.length < 10) {
          if (phone.toString().charAt(0) !== '0') {
            errorMessages.push('Phone number must start with 0 and require 10 digits');
          } else {
            errorMessages.push('Phone number is required 10 digits');
          }
        }
      }
      if (form.get('message').invalid) {
        errorMessages.push('Message is required');
      }
      if (isCommonForm == true) {
        if (form.get('companyname').invalid) {
          errorMessages.push('Company name is required');
        }
      }
      return errorMessages;
    } else return [];
  }

}
