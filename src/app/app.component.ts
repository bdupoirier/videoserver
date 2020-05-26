import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { YoutubeService } from './services/youtube.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})
export class AppComponent implements OnInit {

  title = 'VideoServer';
  apiKey = 'AIzaSyDdYYeBnRHw1pgvSU6z_8gpymAj2IPvUkw';
  channel = "UC86BKGkw3Giit6yTAntInfQ";
  maxResults = 25;
  results = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(private httpClient: HttpClientModule, private router: Router, private youtubeService: YoutubeService, private config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
  }


}
