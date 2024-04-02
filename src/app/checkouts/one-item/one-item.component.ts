import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.scss'],
})
export class OneItemComponent implements OnInit {
  id!: number;
  isLoading: boolean = true;
  item: Clothes = {} as Clothes;
  quantity: number = 1;
  total: number = 0;
  selectedColor!: string;
  selectedSize!: string;
  colorIndex: number = 0;
  loadingShipment: boolean = false;
  errorShipment: boolean = false;
  zipCodeResult: any = {
    days: '',
    description: '',
  };
  shipping: FormGroup = this.formBuilder.group({
    name: ['',  [Validators.required],],
    email: ['',  [Validators.required, Validators.email],],
    phone: ['',  [Validators.required],],
    address: ['',  [Validators.required],],
    city: ['',  [Validators.required],],
    state: ['',  [Validators.required],],
    zipCode: ['',  [Validators.required, Validators.maxLength(5)]],
  });

  card: FormGroup = this.formBuilder.group({
    cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)],
    ],
    cardName: ['', [Validators.required, Validators.maxLength(16)],
    ],
    cardDate: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(5)],
    ],
    cardCVV: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
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
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')!);
      this.selectedColor = params.get('color')!;
      this.selectedSize = params.get('size')!;
    });

    if (this.id !== null) {
      this.getCloth(this.id);
      this.total = this.item.price * this.quantity * this.item.discount;
    } else {
      this.openError('Clothing not found');
    }
  }

  getCloth(id: number) {
    this.cloth.getCloth(id).subscribe({
      next: (data) => {
        this.item = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
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
      data: { message: message,
      title: title},
      panelClass: 'alert-dialog',
    });
  }

  changeQuantity(action: string) {
    if (action === 'add') {
      this.quantity++;
      this.total += this.item.price * this.item.discount;
    } else {
      this.total -= this.item.price * this.item.discount;
      if (this.quantity > 1) {
        this.quantity--;
      }
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
    console.log(this.shipping, this.card)
    if (this.shipping.valid && this.card.valid && this.zipCodeResult.price !== '' && this.errorShipment !== true ) {
      this.openAlert('Your order has been placed', 'Order Placed');
    } else {
      this.openAlert('Please fill all the fields', 'Invalid Information');
    } 
  }

  getInfos() {
    let token = localStorage.getItem('token');
    if (token) {
      this.auth.getUser(token).subscribe({
        next: (data) => {
          this.shipping.patchValue({
            name: data.first_name,
            email: data.email,
            phone: data.phone
          });
        },
        error: (error) => {
          this.openError(error.message);
        },
      });
    }
  }
}
