import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}