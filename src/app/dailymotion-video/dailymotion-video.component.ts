import { Component, OnInit } from '@angular/core';
import { DailymotionService } from '../services/dailymotion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dailymotion-video',
  templateUrl: './dailymotion-video.component.html',
  styleUrls: ['./dailymotion-video.component.css']
})
export class DailymotionVideoComponent implements OnInit {

  videoId: string;
  results: any;
  urlVideo: string;
  safeUrl: SafeUrl;

  constructor(private dailymotionService: DailymotionService, private router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    /* Récuperation ID Video envoyé par méthode GET */
    this.videoId = this.router.snapshot.params['videoId'];
    /* Création de l'url de la vidéo en fonction de son ID */
    this.urlVideo = this.dailymotionService.viewVideo(this.videoId);
    /* Sécurisation de la donnée "urlVideo" afin d'être rendue visible dans l'application Angular */
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
    /* Récupération des informations liées à la vidéo */
    this.dailymotionService.getDailymotionVideo(this.videoId).subscribe(
      (data: any) => {
        this.results = data;
      },
      (error) => {
        console.log('ereur lors de la récupération des informations de la vidéo : ' + error);
      }
    )
  }

}
