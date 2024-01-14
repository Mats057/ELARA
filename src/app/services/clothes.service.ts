import { Clothes } from './../shared/clothes';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  private readonly API = environment.API; // Define API endpoint

  constructor(private http: HttpClient) {} // Inject the HttpClient module

  getClothes() {
    return this.http
      .get<Clothes[]>(`${environment.API}listClothes.php`)
      .pipe(take(1));
  }

  getCloth(id: string) {
    return this.http
      .get<Clothes>(`${environment.API}getClothes.php?id=${id}`)
      .pipe(take(1));
  }

  searchZipCode(zipCode: any) {
    return this.http
      .get<any>(`https://api.zipcodestack.com/v1/distance?code=22201&compare=${zipCode}&country=us&unit=km&apikey=01HM45E2BPQEMY36N50DSJQX15`)
      .pipe(take(1));
  }
}
