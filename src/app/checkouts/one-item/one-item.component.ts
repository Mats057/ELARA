import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ErrorComponent } from 'src/app/dialogs/error/error.component';
import { AuthService } from 'src/app/services/auth.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { Clothes } from 'src/app/shared/clothes';

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
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
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
      console.log(this.item);
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
    console.log(value);
    this.cloth.searchZipCode(value).subscribe({
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
  }

  verifyInfos() {}

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
