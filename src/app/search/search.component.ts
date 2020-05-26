import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { YoutubeService } from '../services/youtube.service';
import { filter } from 'rxjs/operators';
import { DailymotionService } from '../services/dailymotion.service';

/* Nombre maximal de résultats à afficher par plateforme en arrivant sur la page */
let maxResultsYoutube = 5;
let maxResultsDailymotion = 5;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})



export class SearchComponent implements OnInit {

  searchResultsYoutube = [];
  searchResultsDailymotion = [];


  constructor(private router: Router, private route: ActivatedRoute, private youtubeService: YoutubeService, private dailymotionService: DailymotionService) {
  }

  ngOnInit() {
    /* Récupération du ou des mots-clé de recherche */
    const query = this.route.snapshot.params['query'];
    /* Recherche des vidéos Youtube en fonction du mot clé */
    this.youtubeService.searchVideo(query, maxResultsYoutube).subscribe(
      data => {
        this.searchResultsYoutube = Array.of(data.items);
      },
      (error) => {
        console.log('erreur lors de la recherche Youtube :' + error);
      }
    );

    /* Recherche des vidéos Dailymotion en fonction du mot clé */
    this.dailymotionService.searchDailymotionVideos(query, maxResultsDailymotion).subscribe(
      data => {
        this.searchResultsDailymotion = Array.of(data.list);
      },
      (error) => {
        console.log('erreur lors de la recherche Dailymotion :' + error);
      }
    );
  }

  /* Au clic sur "Voir plus" des vidéos Youtube */
  onViewMoreYoutube() {
    const query = this.route.snapshot.params['query'];
    /* On ajoute 5 résultats aux résultats de recherche */
    maxResultsYoutube = maxResultsYoutube + 5;
    this.youtubeService.searchVideo(query, maxResultsYoutube).subscribe(
      data => {
        this.searchResultsYoutube = Array.of(data.items);
      },
      (error) => {
        console.log('erreur lors de la recherche Youtube :' + error);
      }
    )
  }

  /* Au clic sur "Voir plus" des vidéos Dailymotion */
  onViewMoreDailymotion() {
    const query = this.route.snapshot.params['query'];
    /* On ajoute 5 résultats aux résultats de recherche */
    maxResultsDailymotion = maxResultsDailymotion + 5;
    this.dailymotionService.searchDailymotionVideos(query, maxResultsDailymotion).subscribe(
      data => {
        this.searchResultsDailymotion = Array.of(data.list);
      },
      (error) => {
        console.log('erreur lors de la recherche Dailymotion :' + error);
      }
    )
  }

  /* Au clic sur un lien Youtube, on récupère l'ID de la vidéo, on l'envoie en GET vers la page de lecture vidéo et on navigue vers celle-ci */
  onViewYoutubeVideo(videoId) {
    this.router.navigate(['/youtube-video/', videoId]);
  }

  /* Au clic sur un lien Dailymotion, on récupère l'ID de la vidéo, on l'envoie en GET vers la page de lecture vidéo et on navigue vers celle-ci */
  onViewDailymotionVideo(videoId) {
    this.router.navigate(['/dailymotion-video/', videoId]);
  }

}
