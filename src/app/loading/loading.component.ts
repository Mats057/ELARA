import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading:boolean = true;

  constructor(private isLoading:LoadingService) {
    this.loading = isLoading.loading;
   }
}
