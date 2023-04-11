import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  openCart: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleOpenCart(openCart: any) {
    // console.log(openCart);
    this.openCart = openCart;
  }


}
