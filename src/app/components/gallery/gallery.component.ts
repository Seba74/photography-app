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
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { CursorService } from 'src/app/service/cursor.service';
import { getPhoto, loadPhotos, loadPhotosByType, loadSectionPhotos, updatePhoto } from 'src/app/state/actions/photo.actions';
import { AppState } from 'src/app/state/app.state';
import * as AOS from 'aos';
import { ActivatedRoute, Router } from '@angular/router';

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
  type: string = 'all';
  sectionImage$: Observable<any> = new Observable<any>();
  sectionImages$: Observable<any[]> = new Observable<any[]>();
  cover: any;
  overlayActive = false;
  activeButton = '';
  isMobile: boolean = true;
  menuOpen: boolean = false;
  defaultImage: string = "../../assets/images/orange.webp";
  buttons = [
    { id: 'all', label: 'Galería Completa' },
    { id: 'estudio', label: 'Foto Estudio' },
    { id: 'barberia', label: 'Barberias'},
    { id: 'retrato', label: 'Retratos' },
    { id: 'evento', label: 'Eventos' },
    { id: 'paisaje', label: 'Paisajes' }
  ];

  defaultCover: {} = {
    title: "GALERIA COMPLETA",
    type: "all",
    image: "../../assets/images/bg-ia.png"
  }

  @ViewChildren('columns') columns: Array<ElementRef> | undefined = [];

  constructor(
    private store: Store<AppState>,
    private cursorService: CursorService,
    private router: Router
    ) {
    this.loadingImages$ = this.store.select((state) => state.photos.loading);
    this.sectionImages$ = this.store.select((state) => state.sectionPhotos.photos);
    this.sectionImage$ = this.store.select((state) => state.sectionPhoto.photo);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if(scrollTop < 500) {
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

    leftColumn!.nativeElement.style.transform = `translateY(${-scrollTop * 0.03}px)`;
    if(middleColumn){
      middleColumn.nativeElement.style.transform = `translateY(${-scrollTop * 0.02}px)`;
    }
    if(rightColumn){
      rightColumn.nativeElement.style.transform = `translateY(${-scrollTop * 0.04}px)`;
    }

    if(window.innerWidth < 478) {
      leftColumn!.nativeElement.style.transform = `translateY(0)`;
    }
  }

  ngOnInit() {
    if(window.innerWidth > 780) {
      this.isMobile = false;
    }
    this.store.dispatch(getPhoto());
    this.store.dispatch(loadSectionPhotos());
    this.sectionImage$.subscribe((sectionImage) => {
      this.cover = sectionImage;
      this.type = sectionImage.type;
      this.activeButton = sectionImage.type;
      if(this.type == undefined || this.type == ''){
        let localData = localStorage.getItem('photo');
        let photo = JSON.parse(localData!);
        if(!photo){
          localData = localStorage.getItem('photo-nav');
          photo = JSON.parse(localData!);
          if(!photo){
            photo = this.defaultCover;
          }
        }
        this.type = photo.type;
        this.activeButton = photo.type;
        this.cover = photo;
      }
      if(this.type == '') {
        this.router.navigate(['/']);
      }
    });

    if(this.type == 'all'){
      this.store.dispatch(loadPhotos());
      this.images$ = this.store.select((state) => state.photos.photos);
    }else{
      this.store.dispatch(loadPhotosByType({typeName: this.type}));
      this.images$ = this.store.select((state) => state.photosByType.photos);
    }
    
    AOS.init()
    window.addEventListener('load', AOS.refresh)
    
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
        if(!this.isMobile){
          this.imagesPerColumn.forEach((column) => {
            column.sort(() => Math.random() - 0.5);
          });
        }
      });      
    });
  }

  private updateData(data: any){
    localStorage.setItem('photo-nav', JSON.stringify(data));
    localStorage.removeItem('photo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onNavigate(buttonId: string) {
    this.activeButton = buttonId;
    this.overlayActive = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.menuOpen = false;
    setTimeout(() => {
      this.overlayActive = false;
    }, 800);
    if(buttonId == 'all'){
      this.cover = this.defaultCover;
      this.updateData(this.cover);
    }else{
      this.sectionImages$.subscribe((sectionImages) => {
        this.cover = sectionImages.find((sectionImage) => sectionImage.type == buttonId);
        this.updateData(this.cover);
      });
    }
    
    this.type = buttonId;
    if(this.type == 'all'){
      this.store.dispatch(loadPhotos());
      this.images$ = this.store.select((state) => state.photos.photos);
    }else{
      this.store.dispatch(loadPhotosByType({typeName: this.type}));
      this.images$ = this.store.select((state) => state.photosByType.photos);
    }

    
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
        this.imagesPerColumn.forEach((column) => {
          column.sort(() => Math.random() - 0.5);
        });
      });      
    });

  }

  openMenu() {
    this.menuOpen = !this.menuOpen;
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
