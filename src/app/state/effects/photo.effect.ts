import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PhotoService } from 'src/app/service/photo.service';
import { loadPhotos, loadPhotosSuccess, loadPhotosFailure } from '../actions/photo.actions';

@Injectable()
export class PhotoEffect {

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      mergeMap(() =>
        this.photoService.getPhotos().pipe(
          map((photos) => loadPhotosSuccess(photos)),
          catchError((error) => of(loadPhotosFailure(error)))))
    )
  );

  constructor(private actions$: Actions, private photoService: PhotoService) {}
}
