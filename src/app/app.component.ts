import { Component } from '@angular/core';
import { ApiService } from './services/services';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fleurs';
  loading = false;

  constructor() {}

  ngOnInit() {
    // this.apiService.getFlowers().subscribe((res: any) => {
    //   console.log(res);
    // });

    // this.apiService.getFlowerById('005').subscribe((res:any) => {
    //   console.log(res);
      
    // })
  }
}
