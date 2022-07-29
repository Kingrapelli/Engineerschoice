import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindoutService {

  constructor(private http:HttpClient) { }
  getAllUnivercities(){
    return <any> this.http.get('http://universities.hipolabs.com/search?country=United+States');
  }
}
