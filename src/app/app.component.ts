import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CursorService } from './service/cursor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHovering: boolean = false;
  isImg: boolean = false;
  showNav: boolean = false;
  modalOpen: boolean = false;
  textOnImage = '';
  x = 0;
  y = 0;
  title = 'photography-app';

  @ViewChild('cursor') cursor!: ElementRef;
  @HostListener('document:mousemove', ['$event']) onMouseMove(
    event: MouseEvent
  ) {
    this.x = event.pageX;
    this.y = event.pageY;
    this.cursor.nativeElement.style.left = this.x + 'px';
    this.cursor.nativeElement.style.top = this.y + 'px';
    this.cursor.nativeElement.style.display = 'flex';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.cursor.nativeElement.style.display = 'none';
    
  }

  constructor(private cursorService: CursorService) {
    this.cursorService.getIsHovering().subscribe((isHovering: boolean) => {
      this.isHovering = isHovering;
    });
    this.cursorService.getIsImg().subscribe((isImg: boolean) => {
      this.isImg = isImg;
    });
    this.cursorService.getTextOnImage().subscribe((text: string) => {
      this.textOnImage = text;
    });
    this.cursorService.getShowNav().subscribe((value: boolean) => {
      this.showNav = value;
    });
    this.cursorService.getModalOpen().subscribe((value: boolean) => {
      this.modalOpen = value;
    });
  }


  detectHover(event: boolean) {
    this.isHovering = event;
  }
}
