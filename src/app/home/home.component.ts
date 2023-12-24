import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  clothes: any[] = [
    {
      name: 'Beige t-shirt with v-bottom',
      price: 64.99,
      image: ['assets/clothes/one.jpg'],
      discount: 0.7
    },
    {
      name: 'Open v-neck t-shirt',
      price: 55.50,
      image: ['assets/clothes/two-beige.jpg', 'assets/clothes/two-wine.jpg'],
      discount: 0.7
    },
    {
      name: 'T-shirt with a large open collar showing the shoulders',
      price: 50,
      image: ['assets/clothes/three.jpg'],
      discount: 0.7
    },
    {
      name: 'T-shirt with hole on the shoulder',
      price: 50,
      image: ['assets/clothes/four-1.jpg', 'assets/clothes/four-2.jpg'],
      discount: 0.7
    },
    {
      name: 'Blouse with wave collar',
      price: 80,
      image: ['assets/clothes/five-1.jpg', 'assets/clothes/five-2.jpg']
    },
    {
      name: 'Male social shirt',
      price: 50,
      image: ['assets/clothes/six.jpg']
    },
    {
      name: 'T-shirt with lace on the top',
      price: 60,
      image: ['assets/clothes/seven.jpg']
    },
    {
      name: 'Beige coat',
      price: 80,
      image: ['assets/clothes/eight-1.jpg', 'assets/clothes/eight-2.jpg']
    },
    {
      name: 'Cyan white floral dress',
      price: 60,
      image: ['assets/clothes/nine.jpg']
    },
    {
      name: 'White Champion T-shirt',
      price: 80,
      image: ['assets/clothes/ten.jpg']
    },
    {
      name: "Men's Black Long Sleeve T-Shirt",
      price: 40,
      image: ['assets/clothes/eleven.jpg']
    },
    {
      name: 'Flannel dress with buttons',
      price: 80,
      image: ['assets/clothes/twelve-gray.jpg', 'assets/clothes/twelve-wine.jpg']
    }
  ];

}
