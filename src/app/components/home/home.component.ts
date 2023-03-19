import { animate, style, transition, trigger } from '@angular/animations';
import { Component,  ElementRef,  OnInit, ViewChild, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CursorService } from 'src/app/service/cursor.service';
import { loadPhotos, loadSectionPhotos } from 'src/app/state/actions/photo.actions';
import { AppState } from 'src/app/state/app.state';
import { register } from 'swiper/element/bundle';
import { updatePhoto } from 'src/app/state/actions/photo.actions';
import { Photo } from 'src/app/core/interfaces/photo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('3s ease-in', style({ opacity: 0 }))
      ])
  ])
  ]
})
export class HomeComponent implements OnInit {
  
  images$: Observable<any[]> = new Observable<any[]>();
  images: any[] = [];
  loadingImages$: Observable<boolean> = new Observable<boolean>();
  defaultImage: {} = {
    title: 'GALERIA COMPLETA',
    type: 'all',
    image: '../../../assets/images/bg-ia.png'
  }
  isLoaded: boolean = false;
  totalLoaded: number = 0;
  @ViewChild('section') section!: ElementRef;
  
  constructor(
    private cursorService: CursorService,
    private store: Store<AppState>,
    private router: Router
    ) {
    this.images$ = this.store.select((state) => state.sectionPhotos.photos);
    this.loadingImages$ = this.store.select((state) => state.sectionPhotos.loading);
    } 
  
  ngOnInit() {
    register();
    localStorage.clear();
    this.store.dispatch(loadSectionPhotos());
    this.images$.subscribe((data) => this.images = data);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoaded = false;
        this.totalLoaded = 0;
      }
    });
  }

  onImageLoad() {
    this.totalLoaded++;
    if (this.totalLoaded === this.images.length) {
      setTimeout(() => {
      this.isLoaded = true;
      this.section.nativeElement.style.display = 'flex';
      this.cursorService.setLoaded(true);
      }, 250);
    }
  }

  getImage(image: any) {
    const data = image;
    this.store.dispatch(updatePhoto({photo: data}));
    localStorage.setItem('photo', JSON.stringify(data));
  }

  detectHover() {
    this.cursorService.setIsHovering(true);
  }

  detectImage(text?: string) {
    this.cursorService.setIsImg(true, text || '');
  }

  detectLeave() {
    this.cursorService.setIsHovering(false);
  }

  detectLeaveImage() {
    this.cursorService.setIsImg(false, '');
  }

}