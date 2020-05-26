import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  resultsFromSearch = [];
  private wowSubscription: Subscription;

  constructor(private router: Router, private wowService: NgwWowService, private formBuilder: FormBuilder) {
    /* Initialisation de wowService.js et réinitialisation au chargement d'une nouvelle page */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(event => {
        this.wowService.init();
      });
  }

  ngOnInit() {
    /* Inittialisation du formulaire de recherche de vidéo */
    this.initForm();
  } 
  
  
  
    initForm(){
      this.searchForm = this.formBuilder.group({
        search: ['', Validators.required]
      })
    }
  

  /* Fonction de récupération de valeur du formulaire de recherche et envoi de la valeur en GET vers la page "search" */
  onSearchVideo() {
    const query = this.searchForm.get('search').value;
    this.router.navigate(['/search/', query]);
  }
}
