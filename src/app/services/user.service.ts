import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get(`https://reqres.in/api/users/${id}`);
    }
}