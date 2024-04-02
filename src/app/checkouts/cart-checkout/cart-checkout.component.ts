import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take, zip } from 'rxjs';
import { AlertComponent } from 'src/app/dialogs/alert/alert.component';
import { ErrorComponent } from 'src/app/dialogs/error/error.component';
import { AuthService } from 'src/app/services/auth.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { Clothes } from 'src/app/shared/clothes';
import { FormValidations } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent implements OnInit {
  isLoading: boolean = true;
  cart: any = [];
  cartFiltered: any = [];
  total: number = 0;
  colorIndex: number = 0;
  loadingShipment: boolean = false;
  errorShipment: boolean = false;
  zipCodeResult: any = {
    days: '',
    description: '',
  };
  shipping: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.maxLength(5)]],
  });

  card: FormGroup = this.formBuilder.group({
    cardNumber: [
      '',
      [Validators.required, Validators.maxLength(16), Validators.minLength(16)],
    ],
    cardName: ['', [Validators.required, Validators.maxLength(16)]],
    cardDate: [
      '',
      [Validators.required, Validators.maxLength(5), Validators.minLength(3)],
    ],
    cardCVV: [
      '',
      [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cloth: ClothesService,
    private auth: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getInfos();
    this.getCart();
  }

  getCart() {
    this.cart = this.cloth.getCart();
    if (!this.cart) {
      this.openError('Cart not found');
      return;
    }
    this.cart.forEach(
      (item: { id: number; color: string; size: string; quantity: number }) => {
        this.getCloth(item);
      }
    );
    this.isLoading = false;
  }

  getCloth(cloth: { id: number; color: string; size: string; quantity: number }) {
    this.cloth.getCloth(cloth.id).subscribe({
      next: (data) => {
        let itemFiltered = this.cart.find(
          (item: { id: number ,color: string; size: string; quantity: number }) => (item.id === cloth.id && item.color === cloth.color && item.size === cloth.size)
        );
        console.log(itemFiltered);
        if (itemFiltered) {
          itemFiltered.name = data.name;
          itemFiltered.price = data.price;
          itemFiltered.discount = data.discount;
          itemFiltered.images = data.images;
          itemFiltered.description = data.description;
        }
        console.log(itemFiltered);
        this.cartFiltered.push(itemFiltered);
        this.total += data.price * data.discount * itemFiltered.quantity;
      },
      error: (error) => {
        this.openError(error.message);
      },
    });
  }

  openError(message: string) {
    this.dialog.open(ErrorComponent, {
      data: message,
      panelClass: 'error-dialog',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.router.navigate(['/home']);
      take(1);
    });
  }

  openAlert(message: string, title: string) {
    this.dialog.open(AlertComponent, {
      data: { message: message, title: title },
      panelClass: 'alert-dialog',
    });
  }

  changeQuantity(action: string, cloth: { id: number; color: string; size: string; quantity: number }) {
    if (action === 'add') {
      this.cartFiltered.find((item: { id: number, color: string; size: string; quantity: number }, i: number) => {
        if (item.id === cloth.id && item.color === cloth.color && item.size === cloth.size) {
          this.cartFiltered[i].quantity++;
          this.total +=
            this.cartFiltered[i].price * this.cartFiltered[i].discount;
        }
      });
    } else {
      this.cartFiltered.find((item: { id: number, color: string; size: string; quantity: number }, i: number) => {
        if (item.id === cloth.id && this.cartFiltered[i].quantity > 1 && item.color === cloth.color && item.size === cloth.size) {
          this.cartFiltered[i].quantity--;
          this.total -=
            this.cartFiltered[i].price * this.cartFiltered[i].discount;
        }
      });
    }
  }

  searchZip() {
    let value = this.shipping.value.zipCode;
    this.zipCodeResult.price = '';
    this.zipCodeResult.days = '';
    this.loadingShipment = true;
    this.errorShipment = false;
    this.cloth.compareDistance(value).subscribe({
      next: (data) => {
        this.loadingShipment = false;
        if (data.results[value] / 100 < 3) {
          this.zipCodeResult.days = '2-3';
          this.zipCodeResult.price = 0;
        } else {
          this.zipCodeResult.days = `${Math.round(
            data.results[value] / 200 - 2
          )}-${Math.round(data.results[value] / 200)}`;
          this.zipCodeResult.price = data.results[value] / 100;
        }
      },
      error: (error) => {
        this.loadingShipment = false;
        this.errorShipment = true;
      },
    });
    this.cloth.searchZipCode(value).subscribe({
      next: (data) => {
        data = data.results[value];
        data = data[0];
        console.log(data);
        this.shipping.patchValue({
          city: data.city,
          state: data.state,
        });
      },
      error: (error) => {
        this.errorShipment = true;
        this.openAlert('Please enter a valid ZipCode', 'Invalid ZipCode');
      },
    });
  }

  verifyInfos() {
    console.log(this.shipping, this.card);
    if (
      this.shipping.valid &&
      this.card.valid &&
      this.zipCodeResult.price !== '' &&
      this.errorShipment !== true
    ) {
      return true;
    }
    return false;
  }

  getInfos() {
    let token = localStorage.getItem('token');
    if (token) {
      this.auth.getUser(token).subscribe({
        next: (data) => {
          this.shipping.patchValue({
            name: data.first_name,
            email: data.email,
            phone: data.phone,
          });
        },
        error: (error) => {
          this.openError(error.message);
        },
      });
    }
  }

  aplicaErro(form: 'shipping' | 'card', nome: string) {
    if (this[form].get(nome)?.invalid && this[form].get(nome)?.touched) {
      return {
        'has-error': true,
      };
    }
    return {};
  }

  finish() {
    if (this.verifyInfos()) {
      this.openAlert('Your purchase was successful', 'Success');
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    history.back();
  }
}
