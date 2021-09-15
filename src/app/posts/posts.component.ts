import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Posts {
    constructor(
        public userId: number,
        public id: number,
        public title: string,
        public body: string,
    ) {

    }
}

@Component({templateUrl: 'posts.component.html'})
export class PostsComponent implements OnInit{
    posts!: Posts[];
    closeResult!: string;


    constructor(private httpClient: HttpClient ,private modalService: NgbModal){}
    ngOnInit(): void {
       this.getPosts();
    }

    getPosts() {
        this.httpClient.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(
            response => {
                console.log(response)
                this.posts = response;
            }
        )

    }

    open(content: any) {
        this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
   
}