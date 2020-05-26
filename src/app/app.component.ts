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
  maxResults = 25;

  constructor(private httpClient: HttpClientModule, private router: Router, private youtubeService: YoutubeService, private config: NgbCarouselConfig) {
   
  }

  ngOnInit() {
  }


}
