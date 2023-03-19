import { createSelector } from "@ngrx/store";
import { PhotoState, SectionPhotosState, SectionPhotoState } from "../reducers/photo.reducer";
import { AppState } from "../app.state";

export const selectPhotos = (state: AppState) => state.photos;
export const selectPhotosByType = (state: AppState) => state.photosByType;
export const selectSectionPhotos = (state: AppState) => state.sectionPhotos;
export const selectSectionPhoto = (state: AppState) => state.sectionPhoto;

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

export const selectPhotosByTypeList = createSelector(
    selectPhotosByType,
    (state: PhotoState) => state.photos
);

export const selectPhotosByTypeLoading = createSelector(
    selectPhotosByType,
    (state: PhotoState) => state.loading
);

export const selectPhotosByTypeError = createSelector(
    selectPhotosByType,
    (state: PhotoState) => state.error
);

export const selectSectionPhotosList = createSelector(
    selectSectionPhotos,
    (state: SectionPhotosState) => state.photos
);

export const selectSectionPhotosLoading = createSelector(
    selectSectionPhotos,
    (state: SectionPhotosState) => state.loading
);

export const selectSectionPhotosError = createSelector(
    selectSectionPhotos,
    (state: SectionPhotosState) => state.error
);

export const selectSectionPhotoList = createSelector(
    selectSectionPhoto,
    (state: SectionPhotoState) => state.photo
);

