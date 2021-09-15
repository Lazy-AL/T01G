import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
    closeResult!: string;
    user!: Users[];
    // editForm: FormGroup = new FormGroup;

    constructor(private httpClient: HttpClient, private modalService: NgbModal,private fb:FormBuilder
    ) { }

    ngOnInit(): void {
        this.getUsers();
        // this.editForm = this.fb.group({
        //     id: [''],
        //     name: [''],
        //     username: [''],
        //     email: [''],
        //     phone: [''],
        //     company: ['']
        // });
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
        this.modalService.open(content, {size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    
    openDetails(targetModal: any, users: Users) {
        this.modalService.open(targetModal, {
         centered: true,
         backdrop: 'static',
         size: 'lg'
       });
        document.getElementById('fname')!.setAttribute('value', users.name);
        document.getElementById('lname')!.setAttribute('value', users.username);
        document.getElementById('dept')!.setAttribute('value', users.email);
        document.getElementById('email2')!.setAttribute('value', users.phone);
        document.getElementById('cntry')!.setAttribute('value', users.company.name);
     }
}