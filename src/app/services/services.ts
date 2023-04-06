import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry } from './model/enquiry';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl:string = 'http://localhost:8000/';
    constructor(private http:HttpClient) {}

    getFlowers() {
        return this.http.get(this.baseUrl + 'flowers');
    }

    getFlowerById(id: string) {
        return this.http.get(this.baseUrl + `flower/${id}`);
    }

    getSizeAndPrice(flower_id: string) {
        return this.http.get(this.baseUrl + `sizeAndPrice/${flower_id}`);
    }

    addEnquiry(enquiry: Enquiry) {
        return this.http.post(this.baseUrl + 'enquiry/add', enquiry);
    }
}