import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  api_key = '43a11f57b8ca4243a2e6be274560fa4d';
  constructor(private http: HttpClient) {}

  getAllSourcesNews() {
    return this.http.get(
      environment.apiUrl + 'sources?language=en&apiKey=' + this.api_key
    );
  }
  getArticleHeadlinesWithId(id: string) {
    return this.http.get(
      environment.apiUrl +
        'top-headlines?sources=' +
        id +
        '&apiKey=' +
        this.api_key
    );
  }
  getAllArticlesNews() {
    return this.http.get(
      environment.apiUrl +
        'top-headlines?sources=techcrunch&apiKey=' +
        this.api_key
    );
  }
}
