import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cleanErrorData } from "../shared";


export interface MediaAnnotationState {
    mediaFileUrl?: string;
    error: any;
}

export const initMediaAnnotationState: MediaAnnotationState = {
    error: '',
}

const playerSlice = createSlice({
    name: 'ifcViewer',
    initialState: initMediaAnnotationState,
    reducers: {
        setMediaFileURL: (state, action: PayloadAction<string>) => {
            state.mediaFileUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cleanErrorData, (state) => {
            state.error = undefined;
        })
    }
});

export const {
    setMediaFileURL,
} = playerSlice.actions;

export default playerSlice.reducer;