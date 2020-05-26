import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailymotionService } from 'src/app/services/dailymotion.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dailymotion-slider',
  templateUrl: './dailymotion-slider.component.html',
  styleUrls: ['./dailymotion-slider.component.css']
})
export class DailymotionSliderComponent implements OnInit {
  showNavigationArrows = "false";
  showNavigationIndicators = "false";
  results = [];
  resultsFirstSlide = [];
  resultsSecondSlide = [];
  resultsThirdSlide = [];
  srcWidth: number;

  constructor(private route: Router, private dailymotionService: DailymotionService, private config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true; 
  }

  ngOnInit() {
    /* Récupération largeur écran pour le rendu de la vue */
    this.srcWidth = window.innerWidth;
    this.dailymotionService.getPopularDailylmotionVideos().subscribe(
      (
        (data) => {
          this.results = Array.of(data.list);
          /* Attribution des résultats en fonction des différents slides pour la vue desktop */
          this.resultsFirstSlide = this.results[0].slice(0, 4);
          this.resultsSecondSlide = this.results[0].slice(5, 9);
          this.resultsThirdSlide = this.results[0].slice(10, 14);
        }
      )
    )
  }
  
  /* Au clic sur le bouton voir d'une vidéo Dailymotion */
  onViewDailymotionVideo(videoId){
    this.route.navigate(['/dailymotion-video/', videoId]);
  }

}
