import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { allBooks, allReaders } from '../data';
import { Reader } from "../models/reader";
import { Book } from "../models/book";
import { BookTrackerError } from '../models/bookTrackerError';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks():Observable<Book[]> {
    console.log('getting');
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }  
}
