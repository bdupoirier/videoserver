import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /* Ce service permet l'interaction avec le middleware en charge de la communication avec le serveur MongoDB 
  contenant la collection "restaurants" */

  constructor(private http: HttpClient) { }

  /* Sauvegarde d'un restaurant */
  saveRestaurant(restaurant: Object): Observable<any> {
    return this.http.post('http://localhost:8080/api/SaveRestaurant/', restaurant);
  }

  /* Récupération des informations liées à un restaurant en fonction de son ID */
  getRestaurantById(id: string): Observable<any> {
    let parametres = new HttpParams().set('id', id);
    return this.http.get('http://localhost:8080/api/GetRestaurantById', { params: parametres });
  }

  /* Récupération des informations liées aux derniers restaurants enregistrés dans la base de données */
  getLatestRestaurants(): Observable<any> {
    return this.http.get('http://localhost:8080/api/GetLatestRestaurants');
  }

  /* Récupération des information liées à des restaurants en fonction d'un index */
  getNextRestaurants(index: string): Observable<any> {
    let parametres = new HttpParams().set('index', index);
    return this.http.get('http://localhost:8080/api/GetNextRestaurants', { params: parametres });
  }

  /* Suppression d'un restaurant en fonction de son ID */
  deleteRestaurant(id: string): Observable<any> {
    let parametres = new HttpParams().set('id', id);
    return this.http.get('http://localhost:8080/api/DeleteRestaurant/', { params: parametres });
  }
}
