import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { debug } from 'util';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
    reponse = [];
    title: string = 'VideoServer';
    latitude: number;
    longitude: number;
    zoom: number;
    rooms = new Array();
    sommeLat: number;
    sommeLong: number;

    /* Style custom pour la carte Google Maps */
    styles = [
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b5cbe4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#83a5b0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bdcdd3"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e3eed3"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 33
                }
            ]
        },
        {
            "featureType": "road"
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {},
        {
            "featureType": "road",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        }
    ]

    constructor(private http: HttpClient, private CommonService: CommonService) { }

    ngOnInit() {
        /* Récupération infos derniers restaurants de la collection */
        this.CommonService.getLatestRestaurants().subscribe(
            (data) => {
                this.reponse = Array.of(data.reponse);
                this.setMarkers(this.reponse);
            },
            (err) => {
                console.log('erreur : ' + JSON.stringify(err));
            }
        )
    }

    private setMarkers(reponse) {
        reponse[0].forEach(element => {
            var date = new Date();
            var nbNotes = 0;
            var sommeNotes = 0;
            /* Calcul de la moyenne des notes du restaurant pour la barre de progression */
            element['grades'].forEach(note => {
                sommeNotes += note['score'];
                nbNotes += 1;
            });
            if (sommeNotes > 100) {
                /* Moyenne sur 100 si l'une des notes est supérieure à 20 */
                var moyNotes = sommeNotes * nbNotes / 100;
            }
            else {
                var moyNotes = Math.round(sommeNotes / nbNotes);
            }
            /* Attribution d'une variable couleurNote pour la card et la barre de notes du restaurant */
            if (moyNotes <= 9) {
                /* Rouge */
                var couleurNote = "rgb(246,83,20)";
            }
            else if (moyNotes > 9 && moyNotes <= 15) {
                /* Jaune */
                var couleurNote = "rgb(255,187,0)";
            }
            else if (moyNotes > 15) {
                /* Vert */
                var couleurNote = "rgb(124,187,0)";
            }
            /* Stockage des infos dans un Array */
            this.rooms.push({
                "id": element['restaurant_id'],
                "nom": element['name'],
                "moyenne_notes": moyNotes,
                "nombre_notes": nbNotes,
                "couleur_notes": couleurNote,
                "cuisine": element["cuisine"],
                "quartier": element['borough'],
                "adresse": element["address"],
                "rue": element['address']['street'],
                "batiment": element['address']['building'],
                "latitude": element['address']['coord']['coordinates'][1],
                "longitude": element['address']['coord']['coordinates'][0]
            });
        });
    }

  /* Récupération des informations liées à un restaurant en fonction de son ID */
    getMarkerInfos(id) {
        this.CommonService.getRestaurantById(id).subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        );
    }



}
