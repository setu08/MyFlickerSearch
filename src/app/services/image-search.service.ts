import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageSearchRequest, ImageSearchResponse } from '../models/flicker-image-search.models';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {
  previousKeyword: string;
  currentPage = 1;

  constructor(private http: HttpClient) { }

  searchWithKeyword(keyword: string) {
    if (this.previousKeyword === keyword) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.previousKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=05d69995128c8a6a6dc38d8342e09b75&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currentPage}`;

    return this.http.get(url + params).pipe(map((res: ImageSearchResponse) => {
      const urlArr = [];
      res.photos.photo.forEach((imageRequest: ImageSearchRequest) => {
        const photoObj = {
          url: `https://farm${imageRequest.farm}.staticflickr.com/${imageRequest.server}/${imageRequest.id}_${imageRequest.secret}`,
          title: imageRequest.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }
}
