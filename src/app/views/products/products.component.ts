import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/services';
import { faChevronRight, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { Flower } from 'src/app/services/model/flower';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChildren('card') cards!: QueryList<any>;
	@ViewChild('listCard') listCard!: ElementRef<any>;
  @ViewChild('filterDropdown') filterDropdown!: ElementRef<any>;

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faEye = faEye;
  products: any;
  showFilterList: Boolean = false;
  filterDropdownHeight: number = 0;
  productHover: Boolean = false;
  circleEyeHover: Boolean = false;
  positionHover: number = 0;
  blackEye = '../../../assets/img/eye.png';
  whiteEye = '../../../assets/img/whiteeye.png'

  constructor(private apiService: ApiService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProducts();
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

  getProducts() {
    this.apiService.getProducts().subscribe((res: any) => {
      if(!res.err) {
        this.products = res.products;
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

  showDetail(product: any) {
    console.log(product);
    
  }

  mouseEnterImage(idx: number) {
    // console.log(idx);
    this.productHover = true;
    this.positionHover = idx;

  }

  mouseLeaveImage(idx: number) {
    // console.log(idx);
    this.productHover = false;
    this.positionHover = 0;
  }

}
