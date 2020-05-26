import { Component, OnInit } from '@angular/core';
import { RssInfoService } from '../services/rss-info.service';
import { NewsRss } from '../news-rss';

@Component({
  selector: 'app-rss-home',
  templateUrl: './rss-home.component.html',
  styleUrls: ['./rss-home.component.css']
})
export class RssHomeComponent implements OnInit {

  xml: NewsRss;

  constructor(private rssInfosService: RssInfoService) { }

  /* Lectures de flux RSS  */
  /* /!\ En travaux /!\ */
  ngOnInit() {
    const xml2js = this.rssInfosService.GetRssFeedData();
  }

}
