import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  API_KEY = 'bWyWm81r98tdSSioOsURmEWtaF32xxcG';
  limit: string = '30';

  constructor(private http: HttpClient) { }

  getTrending(): Observable<any> {
    const params = new HttpParams()
    .set('api_key', this.API_KEY)
    .set('limit', this.limit);

    return this.getQuery('trending', params).pipe(
      map( (response) => response.data)
    );
  }

  searchByKeyword(keyword:string): Observable<any> {
    const params = new HttpParams()
    .set('api_key', this.API_KEY)
    .set('q', keyword)
    .set('limit', this.limit);

    return this.getQuery('search', params).pipe(
      map( (response) => response.data)
    );
  }

  getUniqueGif(keyword:string): Observable<any> {
    const params = new HttpParams()
    .set('api_key', this.API_KEY)
    .set('s', keyword)
    .set('weirdness', '10');

    return this.getQuery('translate', params).pipe(
      map( (response) => response.data)
    );
  }

  getCategories(): Observable<any> {
    const params = new HttpParams()
    .set('api_key', this.API_KEY);

    return this.getQuery('categories', params).pipe(
      map( (response) => response.data)
    );
  }

  private getQuery(query: string, params?: HttpParams) {
    const url = `https://api.giphy.com/v1/gifs/${query}`;

    return this.http.get<{data: any[]}>(url, {params: params});
  }

}
