import { createAction, props } from "@ngrx/store";
import { Photo } from "src/app/core/interfaces/photo";

export const loadPhotos = createAction(
    "[Photo] Load Photos",
);

export const loadPhotosSuccess = createAction(
    "[Photo] Load Photos Success",
    props<{ photos: Photo[] }>()
);

export const loadPhotosFailure = createAction(
    "[Photo] Load Photos Failure",
    props<{ error: Error}>()
);

export const loadPhotosByType = createAction(
    "[Photo] Load Photos By Type",
    props<{ typeName: string }>()
);

export const loadPhotosByTypeSuccess = createAction(
    "[Photo] Load Photos By Type Success",
    props<{ photos: Photo[] }>()
);

export const loadPhotosByTypeFailure = createAction(
    "[Photo] Load Photos By Type Failure",
    props<{ error: Error}>()
);

export const loadSectionPhotos = createAction(
    "[Photo] Load Section Photos",
);

export const loadSectionPhotosSuccess = createAction(
    "[Photo] Load Section Photos Success",
    props<{ photos: any[] }>()
);

export const loadSectionPhotosFailure = createAction(
    "[Photo] Load Section Photos Failure",
    props<{ error: Error}>()
);

export const updatePhoto = createAction(
    "[Photo] Select Photo",
    props<{ photo: Photo }>()
);

export const getPhoto = createAction(
    "[Photo] Select Photo Success",
);