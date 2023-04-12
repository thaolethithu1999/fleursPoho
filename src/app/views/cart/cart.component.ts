import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  @Output() openCart = new EventEmitter<Boolean>();
  @Input() isOpen: Boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
  }

  handleCloseCart() {
    this.isOpen = !this.isOpen;
    this.openCart.emit(false);
  }

}
