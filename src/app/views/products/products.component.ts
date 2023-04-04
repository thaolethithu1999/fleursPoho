import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  products: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.apiService.getFlowers().subscribe((res: any) => {
      console.log(res);
      if(!res.err) {
        this.products = res.flowers;
      }
    })
  }

}
