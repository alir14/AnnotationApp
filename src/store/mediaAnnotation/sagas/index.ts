import { takeLatest, put, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    setMediaFileURL,
    setAnnotationData,
    setAnnotationError
} from "../slice";
import { Annotation } from "../../../entities";
import { getAnnotationData } from "../selectors";

export function* watchViewerSaga() {
    yield takeLatest(actions.SET_MEDIA_FILE_URL, setMediaFileURLSaga);

    yield takeLatest(actions.SAVE_ANNOTATION, saveAnnotationDataSaga);

    yield takeLatest(actions.DELETE_ANNOTATION, deleteAnnotationSaga);

}

export function* setMediaFileURLSaga(action: PayloadAction<string>) {
    yield put(setMediaFileURL(action.payload));
}

export function* saveAnnotationDataSaga(action: PayloadAction<Annotation>) {
    try {
        const annotationData: Annotation[] = yield select(getAnnotationData);

        const updatedList = [...annotationData, { ...action.payload }];

        yield put(setAnnotationData(updatedList));
    }
    catch (e) {
        const error = (e instanceof Error) ? e.message : e;
        yield put(setAnnotationError(error));
    }

}

export function* deleteAnnotationSaga(action: PayloadAction<number>) {
    try {
        const annotationData: Annotation[] = yield select(getAnnotationData);

        const updatedList = annotationData.filter(item => item.id !== action.payload);
console.log(updatedList);
        yield put(setAnnotationData(updatedList));
    }
    catch (e) {
        const error = (e instanceof Error) ? e.message : e;
        yield put(setAnnotationError(error));
    }

}
