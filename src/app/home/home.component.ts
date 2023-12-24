import { Component, OnInit } from '@angular/core';
import { ClothesService } from '../services/clothes.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showAll: boolean = false;
  clothes: any[] = [];

  showAllClothes(e: any) {
    this.showAll = !this.showAll;
    e.innerHTML = this.showAll ? 'SHOW LESS' : 'VIEW ALL';
  }

  constructor(private getData: ClothesService) {}

  ngOnInit() {
    this.getData.getClothes().subscribe((data: any) => {
      this.clothes = data;
      console.log(data);
    });
  }
}
