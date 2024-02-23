import { Component, OnInit } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  clothes: any[] = [];
  total: number = 0;

  ngOnInit() {
    this.clothes = JSON.parse(localStorage.getItem('bag') || '[]');

    for (let i = 0; i < this.clothes.length; i++) {
      this.clothService.getCloth(this.clothes[i].id).subscribe({
        next: (data) => {
          this.clothes[i].name = data.name;
          this.clothes[i].price = (data.price * data.discount);
          this.clothes[i].image = data.images[0].path;
          this.total += this.clothes[i].price * this.clothes[i].quantity;
        },
      });
    }
  }

  constructor(private clothService: ClothesService) {}

  changeQuantity(index: number, action: string) {
    if (action === 'add') {
      this.clothes[index].quantity++;
      this.total += this.clothes[index].price;
    } else {
      this.total -= this.clothes[index].price;
      if (this.clothes[index].quantity > 1) {
        this.clothes[index].quantity--;
      }
      else{
        this.removeItem(index);
      }
    }
    localStorage.setItem('bag', JSON.stringify(this.clothes));
  }

  removeItem(index: number) {
    this.clothes.splice(index, 1);
    localStorage.setItem('bag', JSON.stringify(this.clothes));
  }

  cleanCart() {
    localStorage.removeItem('bag');
    this.clothes = [];
    this.total = 0;
  }

}
