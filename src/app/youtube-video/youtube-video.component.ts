import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import anchorme from "anchorme";

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  urlVideo = "";
  safeUrl: SafeUrl;
  videoInfos = [];
  videoDescription: any;
description = "";

  constructor(private route: Router, private router: ActivatedRoute, private youtubeService: YoutubeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    /* Récuperation ID Video envoyé par méthode GET */
    const videoId = this.router.snapshot.params['videoId'];
    /* Création de l'url de la vidéo en fonction de son ID */
    this.urlVideo = this.youtubeService.viewVideo(videoId);
    /* Sécurisation de la donnée "urlVideo" afin d'être rendue visible dans l'application Angular */
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
    /* Récupération des informations liées à la vidéo */
    this.youtubeService.getVideoInformations(videoId).subscribe(
      data => {
        /* Création d'un tableau à partir du callback de Youtube API */
        this.videoInfos = Array.of(data);
        /* Mise à part de la description de la vidéo qui doit être traitée afin de rendre les liens hypertexte cliquables */
        this.description = this.videoInfos[0].items[0].snippet.description;
        /* Traitement de la description avec anchorme */
        this.description = anchorme({
          input: this.description,
          options: {
            attributes: {
              target: "_blank"
            }
          }
        });
      },
      (error) => {
        console.log('erreur lors de la récupération d\'informations sur la video :' + error);
      }
    )
  }
}
