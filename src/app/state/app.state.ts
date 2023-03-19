import { ActionReducerMap, State } from "@ngrx/store";
import { photoByTypeReducer, PhotoState, sectionPhotoReducer, SectionPhotosState, SectionPhotoState, updatePhotoReducer } from "./reducers/photo.reducer";
import { photoReducer } from "./reducers/photo.reducer";

export interface AppState {
    photos: PhotoState;
    photosByType: PhotoState;
    sectionPhotos: SectionPhotosState;
    sectionPhoto: SectionPhotoState;
}

export const reducers: ActionReducerMap<AppState> = {
    photos: photoReducer,
    photosByType: photoByTypeReducer,
    sectionPhotos: sectionPhotoReducer,
    sectionPhoto: updatePhotoReducer,
};