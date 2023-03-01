import { createAction } from "@ngrx/store";
import { Photo } from "src/app/core/interfaces/photo";

export const loadPhotos = createAction(
    "[Photo] Load Photos",
);

export const loadPhotosSuccess = createAction(
    "[Photo] Load Photos Success",
    (photos: Photo[]) => ({ photos })
);

export const loadPhotosFailure = createAction(
    "[Photo] Load Photos Failure",
    (error: any) => ({ error })
);
