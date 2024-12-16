// src/app/api/news-articles.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Makes the service available globally
})
export class NewsArticlesService {
  constructor(private http: HttpClient) {
    console.log('HttpClient is: ', this.http);
  }

  getTopHeadlines(): Observable<any> {
    return this.http.get(`${environment.url_base}top-headlines?&language=en&country=us&apiKey=${environment.api_key}`);
  }
  getEveryThing(query:string):Observable<any>{
    return this.http.get(`${environment.url_base}everything?q=${query}}&language=en&apiKey=${environment.api_key}`);

  }

  getArticleByCategory(category:string): Observable<any> {
    return this.http.get(`${environment.url_base}top-headlines?country=us&category=${category}&language=en&apiKey=${environment.api_key}`);
  }
  getDetails(selectedArtice:string){
    

  }
}
