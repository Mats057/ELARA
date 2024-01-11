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
  @Input() id: number;
  @Input() discount: number;
  @Input() classe: string;

  constructor() {
    this.name = '';
    this.price = 0;
    this.image = '';
    this.id = 0;
    this.discount = 1;
    this.classe = '';
  }

}
