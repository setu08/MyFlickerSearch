import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
