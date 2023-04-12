import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, SimpleChange, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/services';
import { faChevronRight, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/services/model/product';
import { Router } from '@angular/router';
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
  whiteEye = '../../../assets/img/whiteeye.png';
  gridview: Boolean = true;
  mobileScreen: Boolean = true;

  constructor(private apiService: ApiService,
              private cdr: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    window.innerWidth <= 576 ? this.mobileScreen = true : this.mobileScreen = false;
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
      this.products.forEach((product: Product) => {
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
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let currentWidth = event.target.innerWidth;
    currentWidth <= 576 ? this.mobileScreen = true : this.mobileScreen = false;
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
          if (entry.isIntersecting) {
            target.classList.add('active');
          }
        });
      }); 
      this.cards.forEach(card => observer.observe(card.nativeElement));
		}
	}

  showDetail(product: Product) {
    console.log(product);
    sessionStorage.setItem('product_id', product.id);
    this.router.navigate([`/collections/flowers-plants/products/${(product.name).toLowerCase()}`]);
  }

  mouseEnterImage(idx: number) {
    this.productHover = true;
    this.positionHover = idx;

  }

  mouseLeaveImage(idx: number) {
    this.productHover = false;
    this.positionHover = 0;
  }

}
