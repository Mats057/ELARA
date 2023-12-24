import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private http: HttpClient) { } // Inject the HttpClient module

  getClothes() {
    return this.http.get('assets/clothes.json');
  }
}
