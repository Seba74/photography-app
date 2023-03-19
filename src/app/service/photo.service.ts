import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../core/interfaces/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URI: string = 'https://photography-backend-ezdf.onrender.com/images';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.URI);
  }

  getPhotosByType(type: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.URI}/type/${type}`);
  }

  getSectionPhotos(): Observable<any> {
    const photos: any[] = [
      {
        title: "BARBERIAS",
        type: "barberia",
        image: "../../assets/sections/barberia.webp"
      },
      {
        title: "RETRATOS",
        type: "retrato",
        image: "../../assets/sections/retrato.webp"
      },
      {
        title: "FOTO ESTUDIO",
        type: "estudio",
        image: "../../assets/sections/estudio.webp"
      },
      {
        title: "EVENTOS",
        type: "evento",
        image: "../../assets/sections/evento.webp"
      },
      {
        title: "PAISAJES",
        type: "paisaje",
        image: "../../assets/sections/paisaje.webp"
      }
    ];

    return new Observable(observer => {
      observer.next(photos);
      observer.complete();
    });
    }  
}
