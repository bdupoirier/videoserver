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
  /* Récupération de flux RSS afin de les afficher dynamiquement dans l'application */
  /* /!\ En travaux /!\ */
  GetRssFeedData() {
    /* Sécurisation de l'url contenant le flux RSS */
    this.xmlUrl = ɵbypassSanitizationTrustHtml("https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml");
    /* Requete de récupération du flux */
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
