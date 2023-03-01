import { createSelector } from "@ngrx/store";
import { PhotoState } from "../reducers/photo.reducer";
import { AppState } from "../app.state";

export const selectPhotos = (state: AppState) => state.photos;

export const selectPhotosList = createSelector(
    selectPhotos,
    (state: PhotoState) => state.photos
);

export const selectPhotosLoading = createSelector(
    selectPhotos,
    (state: PhotoState) => state.loading
);

export const selectPhotosError = createSelector(
    selectPhotos,
    (state: PhotoState) => state.error
);
