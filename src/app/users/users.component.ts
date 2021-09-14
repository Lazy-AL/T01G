import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


export class Users {
    constructor(
        public id: string,
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
    closeResult!:string;

    constructor(private httpClient: HttpClient,private modalService: NgbModal
        ) { }

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
    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

      onSubmit(f: NgForm) {
        const url = 'https://jsonplaceholder.typicode.com/users';
        this.httpClient.post(url, f.value)
          .subscribe((result) => {
            this.ngOnInit(); //reload the table
          });
        this.modalService.dismissAll(); //dismiss the modal
      }

    
}