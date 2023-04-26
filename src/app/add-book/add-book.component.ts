import { Component, OnInit } from '@angular/core';

import { Book } from "../models/book";
import { DataService } from '../core/data.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);
    console.warn('Save new book not yet implemented.');

    this.dataService.addBook(newBook).subscribe(
      (data:Book)=>console.log(data),
      (err: any)=>console.log(err)
    );
  }

}
