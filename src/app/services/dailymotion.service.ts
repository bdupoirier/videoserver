import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DailymotionService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /* Récupération des dernières vidéos et des informations liées à celle-ci */
  getPopularDailylmotionVideos(): Observable<any> {
    let url = 'https://api.dailymotion.com/videos?fields=id%2Ctitle%2Cthumbnail_480_url%2Cdescription&limit=15';
    return this.httpClient.get(url);
  }

  /* Recherche de vidéo en fonction d'un ou plusieurs mot-clés */
  searchDailymotionVideos(query, maxResults): Observable<any> {
    let url = 'https://api.dailymotion.com/videos?limit=' + maxResults + '&search=' + query + '&fields=duration%2Cdescription%2Cid%2Cthumbnail_480_url%2Ctitle';
    return this.httpClient.get(url);
  }

  /* Création d'url de vidéo à partir d'une ID et récupération d'informations liées à celle-ci */
  getDailymotionVideo(videoId): Observable<any> {
    let url = 'https://api.dailymotion.com/video/' + videoId + '?fields=url%2Cdescription%2Ctitle';
    return this.httpClient.get(url);
  }

  /* Création de l'url de vidéo en fonction son ID */
  viewVideo(videoId) {
    let url = "//www.dailymotion.com/embed/video/" + videoId + "";
    return url;
  }

}
