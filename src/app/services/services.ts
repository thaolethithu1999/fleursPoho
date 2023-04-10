import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry } from './model/enquiry';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl:string = 'http://localhost:8000/';
    constructor(private http:HttpClient) {}

    getProducts() {
        return this.http.get(this.baseUrl + 'products');
    }

    getProductById(id: string) {
        return this.http.get(this.baseUrl + `product/${id}`);
    }

    getSizeAndPrice(flower_id: string) {
        return this.http.get(this.baseUrl + `sizeAndPrice/${flower_id}`);
    }

    addEnquiry(enquiry: Enquiry) {
        return this.http.post(this.baseUrl + 'enquiry/add', enquiry);
    }

    // user
    login(loginInfo: any) {
        return this.http.post(this.baseUrl + 'login', loginInfo);
    }

    getUserById(id: string) {
        return this.http.get(this.baseUrl + `user/${id}`);
    }
}