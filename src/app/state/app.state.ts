import { ActionReducerMap } from "@ngrx/store";
import { PhotoState } from "./reducers/photo.reducer";
import { photoReducer } from "./reducers/photo.reducer";

export interface AppState {
    photos: PhotoState;
}

export const reducers: ActionReducerMap<AppState> = {
    photos: photoReducer,
};