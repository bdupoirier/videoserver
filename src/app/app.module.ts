/* Import global des modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { NgwWowModule } from 'ngx-wow';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

/* import global des services */ 
import { YoutubeService } from './services/youtube.service';
import { DailymotionService } from './services/dailymotion.service';
import { VimeoService } from './services/vimeo.service';
import { RssInfoService } from './services/rss-info.service';
import { CommonService } from './services/common.service';

/* Import des components */
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { YoutubeSliderComponent } from './home/youtube-slider/youtube-slider.component';
import { YoutubeVideoComponent } from './youtube-video/youtube-video.component';
import { DailymotionSliderComponent } from './home/dailymotion-slider/dailymotion-slider.component';
import { VimeoSliderComponent } from './home/vimeo-slider/vimeo-slider.component';
import { RssHomeComponent } from './rss-home/rss-home.component';
import { DailymotionVideoComponent } from './dailymotion-video/dailymotion-video.component';

/* Gestion du routing de l'application */ 
const appRoutes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'search', component: SearchComponent },
  {path: 'restaurants', component: RestaurantsComponent },
  {path: 'search/:query', component: SearchComponent },
  {path: 'youtube-video/:videoId', component: YoutubeVideoComponent },
  {path: 'dailymotion-video/:videoId', component: DailymotionVideoComponent},
  {path: 'rss-home', component: RssHomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    YoutubeSliderComponent,
    YoutubeVideoComponent,
    DailymotionSliderComponent,
    VimeoSliderComponent,
    RssHomeComponent,
    DailymotionVideoComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    NgwWowModule,
    CommonModule,
    GoogleMapsModule,
    /* Déclaration de la clé api Google Maps ainsi que la bibliothèque "places" */
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdYYeBnRHw1pgvSU6z_8gpymAj2IPvUkw',
      libraries: ['places']
    })
  ],
  providers: [
    YoutubeService,
    DailymotionService,
    VimeoService,
    RssInfoService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
