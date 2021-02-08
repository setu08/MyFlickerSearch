import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime } from 'rxjs/operators';
import { ImageSearchService } from 'src/app/services/image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {
  imageResponseResult = [];
  keyword: string;
  private searchDelay = 300;
  searchHistory = [];
  recentSearch: string;


  constructor(private imageSearchService: ImageSearchService, private cookieService: CookieService) { }

  ngOnInit() {
    if(this.cookieService) {
    this.recentSearch = this.cookieService.get('recent-search');
  }

  }

  searchImage(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.cookieService.set('recent-search', this.keyword);
      this.imageSearchService.searchWithKeyword(this.keyword).pipe(
        //For better Performance
        //Added debounce time of 300ms, to avoid too much api calls on typing, after each 300 sec it will hit api
        debounceTime(this.searchDelay),
      )
      .subscribe(value => {
        this.imageResponseResult = value;
      })
    }
  }

  onRecentSearch(recentKeyword: string) {
    this.imageSearchService.searchWithKeyword(recentKeyword).subscribe(value => {
      this.imageResponseResult = value;
    })
  }


  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.imageSearchService.searchWithKeyword(this.keyword)
      .toPromise()
      .then(imageResult => {
        this.imageResponseResult = this.imageResponseResult.concat(imageResult);
      });
    }
  }

}
