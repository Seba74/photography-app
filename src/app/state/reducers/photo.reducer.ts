import { createReducer, on } from "@ngrx/store";
import { Photo } from "src/app/core/interfaces/photo";
import { loadPhotos, loadPhotosSuccess, loadPhotosFailure, loadPhotosByType, loadPhotosByTypeSuccess, 
    loadPhotosByTypeFailure, loadSectionPhotos, loadSectionPhotosSuccess, loadSectionPhotosFailure, 
    updatePhoto, getPhoto } from "../actions/photo.actions";

export interface PhotoState {
    photos: Photo[];
    loading: boolean;
    error: Error | undefined;
}

export interface SectionPhotosState {
    photos: any[];
    loading: boolean;
    error: Error | undefined;
}

export interface SectionPhotoState {
    photo: any;
}

export const initialState: PhotoState = {
    photos: [],
    loading: false,
    error: undefined,
};

export const initialStateSection: SectionPhotosState = {
    photos: [],
    loading: false,
    error: undefined,
}

export const initialPhotoState: SectionPhotoState = {
    photo: {},
}

export const photoReducer = createReducer(
    initialState,
    on(loadPhotos, (state) => ({...state, loading: true})),
    on(loadPhotosSuccess, (state, { photos }) => ({...state, photos, loading: false})),
    on(loadPhotosFailure, (state, { error }) => ({...state, error, loading: false})),
);

export const photoByTypeReducer = createReducer(
    initialState,
    on(loadPhotosByType, (state) => ({...state, loading: true})),
    on(loadPhotosByTypeSuccess, (state, { photos }) => ({...state, photos, loading: false})),
    on(loadPhotosByTypeFailure, (state, { error }) => ({...state, error, loading: false})),
);

export const sectionPhotoReducer = createReducer(
    initialStateSection,
    on(loadSectionPhotos, (state) => ({...state, loading: true})),
    on(loadSectionPhotosSuccess, (state, { photos }) => ({...state, photos, loading: false})),
    on(loadSectionPhotosFailure, (state, { error }) => ({...state, error, loading: false})),
);

export const updatePhotoReducer = createReducer(
    initialPhotoState,
    on(updatePhoto, (state, { photo }) => ({...state, photo})),
);

export const getPhotoReducer = createReducer(
    initialPhotoState,
    on(getPhoto, (state) => ({...state})),
);






