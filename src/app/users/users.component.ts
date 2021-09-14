import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'


export class Users {
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public phone: string,
        public company: {
            name: string
        }

    ) {

    }
}


@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})


export class UserComponent implements OnInit {

    users!: Users[];


    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users').subscribe(
            response => {
                console.log(response)
                this.users = response;
            }
        )

    }
}