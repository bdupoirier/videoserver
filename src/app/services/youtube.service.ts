import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  title = 'VideoServer';
  apiKey = 'AIzaSyDdYYeBnRHw1pgvSU6z_8gpymAj2IPvUkw';
  channel = "UC86BKGkw3Giit6yTAntInfQ";
  maxResults = 25;

  constructor(private httpClient: HttpClient, private router: Router) {

  }
  /* Requête d'affichage des vidéos populaires par région */
  getPopularVideosByRegion(): Observable<any> {
    const regionCode = window.navigator.language.split('-')[1];
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=' + regionCode + '&key=' + this.apiKey + '&maxResults=15';
    return this.httpClient.get(url);

  }

  /* Requéte de recherche de vidéo en fonction d'un mot clé et capping du nombre de résultats */
  searchVideo(query, maxResults): Observable<any> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&q=' + query + '&part=snippet&maxResults=' + maxResults + '';
    return this.httpClient.get(url);
  }

  /* Génération de l'url de vidéo afin d'être lue dans le player Angular */
  viewVideo(videoId) {
    let url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    return url;
  }

  /* Requête de récupération d'informations concernant une chaine Youtube */
  viewChannel(channelId) {
    let url = "https://www.googleapis.com/youtube/v3/channels&id=" + channelId;
    return this.httpClient.get(url);
  }

  /* Récupération d'informations concernant une vidéo Youtube */
  getVideoInformations(videoId): Observable<any> {
    let url = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + videoId + "&key=" + this.apiKey + "";
    return this.httpClient.get(url);
  }

}
