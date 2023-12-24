import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clothes-show',
  templateUrl: './clothes-show.component.html',
  styleUrls: ['./clothes-show.component.scss']
})
export class ClothesShowComponent {

  @Input() name: string;
  @Input() price: number;
  @Input() image: string;
  @Input() description: string;
  @Input() discount: number;

  constructor() {
    this.name = '';
    this.price = 0;
    this.image = '';
    this.description = '';
    this.discount = 1;
  }

}
