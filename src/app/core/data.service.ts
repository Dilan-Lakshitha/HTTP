import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { allBooks, allReaders } from '../data';
import { Reader } from "../models/reader";
import { Book } from "../models/book";
import { OldBook } from '../models/oldBook';

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

  getBookById(id: number):Observable <Book> {
    return this.http.get<Book>(`/api/books/${id}`,{
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }
  getOldBookById(id : number):Observable<OldBook>{
    return this.http.get<Book>(`/api/books/${id}`).pipe(
      map(b=><OldBook>{
        bookTitle:b.title,
        year:b.publicationYear
      }),
      tap(classicBook => console.log(classicBook))
    );
  }
    addBook(newBook:Book):Observable<Book>{
      return this.http.post<Book>('/api/book',newBook,{
        headers:new HttpHeaders({
          'Content-Type': 'application/json'
      })
    });
  }
    updateBook(updateBook:Book):Observable<void>{
      return this.http.put<void>(`/api/book/${updateBook.bookID}`,updateBook,{
        headers:new HttpHeaders({
          'Content-Type': 'application/json'
      })
    });
  }
    deleteBook(bookID: number): Observable<void>{
      return this.http.delete<void>(`/api/books/${bookID}`);
    }
}
