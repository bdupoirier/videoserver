import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /* Requête de récupération des vidéos populaires Vimeo */
  getPopularVimeoVideos() {
    let url = "https://api.vimeo.com/videos";
    return this.httpClient.get(url);
  }
  
  /* Requête de recherche de vidéos Vimeo */
  searchVimeoVideos(query): Observable<any> {
    let url = "https://api.vimeo.com/videos&query=" + query + "";
    return this.httpClient.get(url);
  }
}
