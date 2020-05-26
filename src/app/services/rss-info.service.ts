import { Injectable, Sanitizer, ɵbypassSanitizationTrustHtml } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NewsRss } from '../news-rss';

@Injectable({
  providedIn: 'root'
})

export class RssInfoService {

  RssData: NewsRss;
  xmlUrl: SafeUrl;

  constructor(private http: HttpClient, sanitize: DomSanitizer) {}

  GetRssFeedData() {
    this.xmlUrl = ɵbypassSanitizationTrustHtml("https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml");
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http
      .get<any>(this.xmlUrl.toString(), {
        headers: new HttpHeaders()
        .set('Content-Type', 'text/xml') 
        .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
  })
      .subscribe(data => {
        let parseString = data.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          console.log(this.RssData);
        });
      });
  }

}
