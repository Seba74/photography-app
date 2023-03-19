import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { updatePhoto } from 'src/app/state/actions/photo.actions';
import { AppState } from 'src/app/state/app.state';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  animations: [
    trigger('menuAnimation', [
      state('open', style({ height: '100vh' })),
      state('closed', style({ height: '0' })),
      transition('closed => open', animate('350ms .4s cubic-bezier(.95,.14,1,.93)')), 
      transition('open => closed', animate('350ms .4s cubic-bezier(.95,.14,1,.93)')),
    ]),
  ],
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  @Output() isHovering = new EventEmitter<boolean>();
  @Input() loaded: boolean = false;
  @Input() showNav: boolean = false;
  @ViewChild('menu') menu!: any;
  isOnTop: boolean = true;
  showMenu = false;
  x = 0;
  y = 0;
  menuState: 'open' | 'closed' = 'closed';
  socialMedia = [ 
    { name: 'twitter', url: 'https://twitter.com/' },
    { name: 'facebook', url: 'https://www.facebook.com/' },
    { name: 'instagram', url: 'https://www.instagram.com/' },
    { name: 'linkedin', url: 'https://www.linkedin.com/' },
  ]
  routerLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Galeria', url: '/gallery' },
    { name: 'Sobre Mi', url: '/about' },
  ];
  defaultImage: {} = {
    title: 'GALERIA COMPLETA',
    type: 'all',
    image: '../../../assets/images/bg-ia.png'
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.scrollY > 700) {
      this.isOnTop = false;
    } else {
      this.isOnTop = true;
    }
  }

  constructor(private store: Store<AppState>) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.isOnTop = true;
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
  }
  
  closeMenu() {
    this.showMenu = false;
    this.isOnTop = false;
    this.menuState = 'closed';
  }

  detectHover() {
    this.isHovering.emit(true);
  }

  detectLeave() {
    this.isHovering.emit(false);
  }

  getImage(image: any) {
    this.store.dispatch(updatePhoto({photo: image}));
    localStorage.setItem('photo', JSON.stringify(image));
    this.showMenu = false;
    this.isOnTop = false;
    this.menuState = 'closed';
  }
}
