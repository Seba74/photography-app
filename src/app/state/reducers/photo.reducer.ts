import { createReducer, on } from "@ngrx/store";
import { Photo } from "src/app/core/interfaces/photo";
import { loadPhotos, loadPhotosSuccess, loadPhotosFailure } from "../actions/photo.actions";

export interface PhotoState {
    photos: Photo[];
    loading: boolean;
    error: Error | undefined;
}

export const initialState: PhotoState = {
    photos: [],
    loading: false,
    error: undefined,
};

export const photoReducer = createReducer(
    initialState,
    on(loadPhotos, (state) => ({...state, loading: true})),
    on(loadPhotosSuccess, (state, { photos }) => ({...state, photos, loading: false})),
    on(loadPhotosFailure, (state, { error }) => ({...state, error, loading: false})),
);




