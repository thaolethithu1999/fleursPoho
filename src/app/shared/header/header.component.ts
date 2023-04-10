import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faUserAlt, faUserPlus, faPhoneVolume, faShoppingBag, faPhone, faCartArrowDown, faChevronRight, faChevronDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/services/model/user';
import { ApiService } from 'src/app/services/services';

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
  faSignOutAlt = faSignOutAlt;

  isShowMenu: Boolean = false;
  showAbout: Boolean = false;
  showShop: Boolean = false;
  menuHeight = 0;

  isUserLogin: Boolean = false;
  userId: string = '';
  user!: User;

  constructor(private cdr: ChangeDetectorRef,
              private apiService: ApiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')) {
      console.log(sessionStorage.getItem('user_id'));
      this.isUserLogin = true;
      this.userId = sessionStorage.getItem('user_id') || '';
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.apiService.getUserById(this.userId).subscribe((res: any) => {
      console.log(res);
      if(res.user) {
        this.user = res.user;
      }
    })
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

  logout() {
    this.isUserLogin = false;
    sessionStorage.removeItem('user_id');
  }
}
