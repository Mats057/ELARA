import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit{

  ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
