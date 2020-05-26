import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VimeoService } from 'src/app/services/vimeo.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vimeo-slider',
  templateUrl: './vimeo-slider.component.html',
  styleUrls: ['./vimeo-slider.component.css']
})
export class VimeoSliderComponent implements OnInit {

  showNavigationArrows = "false";
  showNavigationIndicators = "false";
  resultsVimeo = [];
  srcWidth: number;

  constructor(private route: Router, private vimeoService: VimeoService, private config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true; 
   }

  ngOnInit() {
    /* Récupération de la largeur écran en vue de l'affichage responsive du carousel */
    this.srcWidth = window.innerWidth;
    /* Récupération de vidéo populaires Viméo */
    this.vimeoService.getPopularVimeoVideos().subscribe(
      (
        (data) => {
          this.resultsVimeo = Array.of(data);
          console.log(this.resultsVimeo);
        }
      )
    )
  }

}
