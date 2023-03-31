import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faUserAlt, faUserPlus, faPhoneVolume, faShoppingBag, faPhone, faCartArrowDown, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @ViewChild('listMenu') listMenu!: ElementRef<any>;
  @ViewChild('mainMenu') mainMenu!: ElementRef<any>;

  faUserAlt = faUserAlt;
  faUserPlus = faUserPlus;
  faPhoneVolume = faPhoneVolume;
  faShoppingBag = faShoppingBag;
  faPhone = faPhone;
  faCartArrowDown = faCartArrowDown;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  isShowMenu: Boolean = false;
  showAbout: Boolean = false;
  showShop: Boolean = false;
  menuHeight = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  showMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.menuHeight = this.isShowMenu ? this.mainMenu.nativeElement.clientHeight : 0;
  }

  handleShowSubmenu(type: string) {
    if (type == 'about') {
      this.showAbout = !this.showAbout;
      this.showShop = false;
      this.cdr.detectChanges();
      this.menuHeight = this.mainMenu.nativeElement.clientHeight;
    } else {
      this.showAbout = false;
      this.showShop = !this.showShop;
      this.cdr.detectChanges();
      this.menuHeight = this.mainMenu.nativeElement.clientHeight;
    }
  }

}
