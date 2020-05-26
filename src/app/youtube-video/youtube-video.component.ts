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
    const videoId = this.router.snapshot.params['videoId'];
    this.urlVideo = this.youtubeService.viewVideo(videoId);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
    this.youtubeService.getVideoInformations(videoId).subscribe(
      data => {
        this.videoInfos = Array.of(data);
        this.description = this.videoInfos[0].items[0].snippet.description;
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