import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { CursorService } from 'src/app/service/cursor.service';
import { loadPhotos } from 'src/app/state/actions/photo.actions';
import { AppState } from 'src/app/state/app.state';
import * as AOS from 'aos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({ transform: 'scale(0.5)' }),
        animate('300ms', style({ transform: 'scale(1)' })),
      ]),
      transition('visible => void', [
        style({ transform: 'scale(1)' }),
        animate('300ms', style({ transform: 'scale(0.5)' })),
      ]),
    ]),
    trigger('leaveAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms', style({ opacity: 0.7 })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('2s ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class GalleryComponent {
  isOnPreview: boolean = false;
  showCount: boolean = false;
  showMask: boolean = false;
  images$: Observable<Photo[]> = new Observable<Photo[]>();
  images: Photo[] = [];
  loadingImages$: Observable<boolean> = new Observable<boolean>();
  currentImageOnBox: Photo = this.images[0];
  currentIndex: number = 0;
  totalImages: number = 0;
  isDown: boolean = false;
  imagesPerColumn: Array<Photo[]> = [];

  @ViewChildren('columns') columns: Array<ElementRef> | undefined = [];

  constructor(
    private store: Store<AppState>,
    private cursorService: CursorService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.images$ = this.store.select((state) => state.photos.photos);
    this.loadingImages$ = this.store.select((state) => state.photos.loading);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if(scrollTop < 300) {
      this.isDown = false;
    }else{
      this.isDown = true;
    }
    
    const leftColumn = this.columns!.find(
      (column) => column.nativeElement.id === '1'
    );
    const middleColumn = this.columns!.find(
      (column) => column.nativeElement.id === '2'
    );
    const rightColumn = this.columns!.find(
      (column) => column.nativeElement.id === '3'
    );

    leftColumn!.nativeElement.style.transform = `translateY(${-scrollTop * 0.08}px)`;
    if(middleColumn){
      middleColumn.nativeElement.style.transform = `translateY(${-scrollTop * 0.06}px)`;
    }
    if(rightColumn){
      rightColumn.nativeElement.style.transform = `translateY(${-scrollTop * 0.04}px)`;
    }

    if(window.innerWidth < 478) {
      leftColumn!.nativeElement.style.transform = `translateY(0)`;
    }
  }

  ngOnInit() {

    AOS.init()
    window.addEventListener('load', AOS.refresh)
    
    this.store.dispatch(loadPhotos());
    this.images$.subscribe((images) => {
      this.images = images;
      this.totalImages = images.length;

      if (window.innerWidth < 476) {
        this.imagesPerColumn = [[]];
      } else if (window.innerWidth <= 768) {
        this.imagesPerColumn = [[], []];
      } else {
        this.imagesPerColumn = [[], [], []];
      }

      let ceilOfImages = Math.ceil(
        this.totalImages / this.imagesPerColumn.length
      );
      this.images.forEach((image, index) => {
        let columnIndex = index % this.imagesPerColumn.length;
        if (this.imagesPerColumn[columnIndex].length >= ceilOfImages) {
          ceilOfImages = Math.ceil(
            (this.totalImages - index) /
              (this.imagesPerColumn.length - columnIndex)
          );
          columnIndex++;
        }
        this.imagesPerColumn[columnIndex].push(image);
      });      

    });
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

  onPreviewImage(id: string) {
    this.currentIndex = this.images.findIndex((image) => image._id === id);
    this.currentImageOnBox =
      this.images.find((image) => image._id === id) || this.images[0];
    this.showMask = true;
    this.showCount = true;
    this.isOnPreview = true;

    // Cursor Options
    this.cursorService.setIsHovering(false);
    this.cursorService.setIsImg(false, '');
    this.cursorService.setModalOpen(true);
  }

  onClosePreview() {
    this.cursorService.setModalOpen(false);
    this.showMask = false;
    this.showCount = false;
    this.isOnPreview = false;
  }

  goNext() {
    if (this.currentIndex >= this.totalImages - 1) {
      this.currentIndex = this.totalImages - 1;
    } else {
      this.currentIndex++;
      this.currentImageOnBox = this.images[this.currentIndex];
    }
  }

  goBack() {
    if (this.currentIndex <= 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex--;
      this.currentImageOnBox = this.images[this.currentIndex];
    }
  }

  animationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.onClosePreview();
    }
  }
}
