import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PhotoService } from 'src/app/service/photo.service';
import { loadPhotos, loadPhotosSuccess, loadPhotosFailure, loadPhotosByType, loadSectionPhotos, loadPhotosByTypeSuccess, loadPhotosByTypeFailure, loadSectionPhotosSuccess, loadSectionPhotosFailure, updatePhoto, getPhoto } from '../actions/photo.actions';

@Injectable()
export class PhotoEffect {

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      mergeMap(() =>
        this.photoService.getPhotos().pipe(
          map((res) => loadPhotosSuccess({ photos: res })),
          catchError((error) => of(loadPhotosFailure(error)))))
    )
  );

  loadPhotosByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotosByType),
      mergeMap((action: any) =>
        this.photoService.getPhotosByType(action.typeName).pipe(
          map((res) => loadPhotosByTypeSuccess({ photos: res })),
          catchError((error) => of(loadPhotosByTypeFailure(error)))))
    )
  );

  loadSectionPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSectionPhotos),
      mergeMap(() =>
        this.photoService.getSectionPhotos().pipe(
          map((res) => loadSectionPhotosSuccess({ photos: res })),
          catchError((error) => of(loadSectionPhotosFailure(error)))))
    )
  );
  

  constructor(private actions$: Actions, private photoService: PhotoService) {}
}
