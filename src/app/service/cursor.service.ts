import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CursorService {

  private isHovering = new BehaviorSubject<boolean>(false);
  private isImg = new BehaviorSubject<boolean>(false);
  private noNav = new BehaviorSubject<boolean>(false);
  private textOnImage = new BehaviorSubject<string>('');
  private modalOpen = new BehaviorSubject<boolean>(false);
  private loaded = new BehaviorSubject<boolean>(false);

  setIsHovering(event: boolean) {
    this.isHovering.next(event);
  }

  setModalOpen(event: boolean) {
    this.modalOpen.next(event);
  }

  setIsImg(event: boolean, text: string) {
    this.isImg.next(event);
    this.textOnImage.next(text);
  }

  setLoaded(event: boolean) {
    this.loaded.next(event);
  }

  getIsHovering() {
    return this.isHovering.asObservable();
  }

  getModalOpen() {
    return this.modalOpen.asObservable();
  }

  getIsImg() {
    return this.isImg.asObservable();
  }

  getTextOnImage() {
    return this.textOnImage.asObservable();
  }

  setShowNav(value: boolean) {
    this.noNav.next(value);
  }

  getShowNav() {
    return this.noNav.asObservable();
  }

  getLoaded() {
    return this.loaded.asObservable();
  }

}
