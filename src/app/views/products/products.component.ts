import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/services';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Flower } from 'src/app/services/model/flower';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChildren('card') cards!: QueryList<any>;
	@ViewChild('listCard') listCard!: ElementRef<any>;

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  products: any;
  showFilterList: Boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFlowers();
  }

  ngAfterViewInit() {
    this.cards.changes.subscribe((queryChange: any) => {
      const observer = new IntersectionObserver((entries: any) => {
        entries.forEach((entry: any) => { 
          const { target } = entry;
          if (entry.isIntersecting) {
            target.classList.add('active');
          }
         
        });
      }); 
      this.cards.forEach(card => {
        observer.observe(card.nativeElement);
      });
    });
  }

  getFlowers() {
    this.apiService.getFlowers().subscribe((res: any) => {
      if(!res.err) {
        this.products = res.flowers;
        this.getSizeAndPrice();
      }
    })
  }

  getSizeAndPrice() {
    if(this.products) {
      this.products.forEach((product: Flower) => {
        this.apiService.getSizeAndPrice(product.id).subscribe((res: any) => {
          if(!res.err) {
            product.sizeprice = res.sizeprice;
          }
        });
      });
    }
  }

  handleShowFilterList() {
    this.showFilterList = !this.showFilterList;
  }

  @HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		let positionOfListCard = this.listCard.nativeElement.offsetTop - 1500;
		if (window.scrollY > positionOfListCard) {
			//show img
			// call api -> list -> show -> load more
			const observer = new IntersectionObserver((entries: any) => {
        entries.forEach((entry: any) => { 
          const { target } = entry;
          // console.log(entry);
          if (entry.isIntersecting) {
            target.classList.add('active');
          }
        });
      }); 
      this.cards.forEach(card => observer.observe(card.nativeElement));
		}
	}
}
