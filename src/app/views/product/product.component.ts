import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/services/model/product';
import { ApiService } from 'src/app/services/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  productId: string = '';
  product: any;
  price: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    if(sessionStorage.getItem('product_id')) {
      this.productId = sessionStorage.getItem('product_id') || '';
      this.getProduct(this.productId);
    }
  }

  getProduct(id: string) {
    this.apiService.getProductById(id).subscribe((res: any) => {
      if(!res.err) {
        this.product = res.product;
        this.getSizeAndPrice();
      }
    })
  }


  getSizeAndPrice() {
    if(this.product) {
      this.apiService.getSizeAndPrice(this.productId).subscribe((res: any) => {
        if(!res.err) {
          this.product.sizeprice = res.sizeprice;
          this.price = this.product.sizeprice[0].price;
        }
      });
    }
  }

  handleChooseSize(size: any) {
    console.log(size);
    
  }

}
