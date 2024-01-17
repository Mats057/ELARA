import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ClothesService } from '../../services/clothes.service';
import { MatDialog } from '@angular/material/dialog';
import { SwiperOptions } from 'swiper/types';
import * as feather from 'feather-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorComponent } from 'src/app/dialogs/error/error.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
})
export class ClothesComponent implements AfterViewInit, OnInit {
  clothID: string = this.activatedRoute.snapshot.paramMap.get('id')!;
  selectedColor: string = '';
  selectedSize: string = '';
  error: string = '';
  cloth: any = {};
  loadingShipment: boolean = false;
  errorShipment: boolean = false;
  zipCodeResult: any = {
    days: '',
    description: '',
  };
  options: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    color: ['', [Validators.required]],
    size: ['', [Validators.required]],
    zipCode: '',
  });
  filteredColors: any[] = [];


  constructor(
    private clothesService: ClothesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

  ngOnInit() {
    this.clothesService.getCloth(this.clothID).subscribe({
      next: (data) => {
        this.cloth = data;
        this.filteredColors = [
          ...new Set(this.cloth.images.map((item: any) => item.color)),
        ];
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.openDialog(error.message);
      },
    });
  }

  ngAfterViewInit() {
    feather.replace();
  }

  index = 0;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {},
  };

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(color: string) {
    this.selectedSize = color;
  }

  searchZip() {
    let value = this.options.value.zipCode;
    this.zipCodeResult.price = '';
    this.zipCodeResult.days = '';
    this.loadingShipment = true;
    this.errorShipment = false;
    console.log(value);
    this.clothesService.searchZipCode(value).subscribe({
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

  onSubmit() {
    this.options.patchValue({
      id: this.clothID,
    });
  }

  openDialog(error: string) {
    this.dialog.open(ErrorComponent, {
      data: error,
      panelClass: 'error-dialog',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.router.navigate(['/home']);
      take(1);
    });
  }

}
