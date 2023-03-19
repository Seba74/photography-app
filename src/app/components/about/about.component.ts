import { Component } from '@angular/core';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { HttpClient } from '@angular/common/http';
import { CursorService } from 'src/app/service/cursor.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private http: HttpClient, private cursorService: CursorService) {}

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  downloadPDF() {
    const url = 'assets/portafolio.pdf';
    this.http.get(url, { responseType: 'blob' }).subscribe((res: any) => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL);
    });
  }

  detectHover() {
    this.cursorService.setIsHovering(true);
  }

  detectLeave() {
    this.cursorService.setIsHovering(false);
  }


}
