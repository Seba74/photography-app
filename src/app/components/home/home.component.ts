import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { CursorService } from 'src/app/service/cursor.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('2s ease-in', style({ opacity: 0 }))
      ])
  ])
  ]
})
export class HomeComponent implements OnInit {
  
  sectionsNames: string[] = ['E-Comerce', 'Woods', 'Desks', 'Sesions'];
  
  constructor(private cursorService: CursorService) {}  
  
  ngOnInit() {
    register();
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
