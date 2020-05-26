import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
declare var $: any;

@Component({
  selector: 'app-youtube-slider',
  templateUrl: './youtube-slider.component.html',
  styleUrls: ['./youtube-slider.component.css']
})
export class YoutubeSliderComponent implements OnInit {

  title = 'VideoServer';
  /* Clé Youtube API */
  apiKey = 'AIzaSyDdYYeBnRHw1pgvSU6z_8gpymAj2IPvUkw';
  channel = "UC86BKGkw3Giit6yTAntInfQ";
  maxResults = 25;
  results = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;
  srcWidth: number;
  arrayCarYouMobile: any;

  constructor(private httpClient: HttpClientModule, private router: Router, private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    /* Récupération largeur ecran pour affichage  */
    this.srcWidth = window.innerWidth;
    /* Récupération des dernières vidéos populaires en fonction de la région de l'utilisateur */
    this.youtubeService.getPopularVideosByRegion().subscribe(
      (
        (data) => {
          this.results = Array.of(data.items);
        }
      )
    )
    
    
    
  }
  

  /* Au clic sur un lien vidéo, navigation vers la page de  lecture de la vidéo et envoi de l'ID vidéo en méthode GET */ 
  onViewYoutubeVideo(videoId) {
    this.router.navigate(['/youtube-video/', videoId]);
  }
}
