import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


// export class Users {
//     getUsers() {
//         throw new Error('Method not implemented.');
//     }
//     name?: string
//     username?: string
//     email?:string
//     phone?:string
//     company?: {
//         name:string,
//         catchPhrase: string,
//         bs:string
//     }
// }

// @Injectable({
//     providedIn: 'root'
// })

// export class UserService {

//     constructor(private http: HttpClient){}
//     url : string = 'https://jsonplaceholder.typicode.com/users'
//     getUsers() {
//         return this.http.get<Users>(this.url);
//       }
// }