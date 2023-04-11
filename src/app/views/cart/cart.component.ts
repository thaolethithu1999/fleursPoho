import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  @Output() openCart = new EventEmitter<Boolean>();
  @Input() isOpen: Boolean = false;
  // openCart: Boolean = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.isOpen);

  }

  ngOnChanges() {
    // console.log(this.isOpen);
    
  }

  handleCloseCart() {
    this.isOpen = !this.isOpen;
    // console.log(this.isOpen);
    this.openCart.emit(false);
  }

}
