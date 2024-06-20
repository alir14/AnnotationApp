import { put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAnnotationClasses } from "../selectors";
import { setAnnotationClassesError, setAnnotationClasses, setSelectedAnnotationClasses } from "../slice";

export function* watchAnnotationClassSaga() {
    yield takeLatest(actions.SET_ANNOTATION_CLASSES, setAnnotationClassesSaga);

    yield takeLatest(actions.DELETE_ANNOTATION_CLASSES, deleteAnnotationClassesSaga);

    yield takeLatest(actions.SET_SELETED_ANNOTATION_CLASSES, setSelectedAnnotationClassesSaga);
}

export function* setAnnotationClassesSaga(action: PayloadAction<string>) {
    try {
        const classes: string[] = yield select(getAnnotationClasses);

        yield put(setAnnotationClasses([...classes, action.payload]));

        if (classes.length == 0) {
            yield put(setSelectedAnnotationClasses(action.payload));
        }
    }
    catch (e) {
        const error = (e instanceof Error) ? e.message : e;
        yield put(setAnnotationClassesError(error));
    }

}

export function* setSelectedAnnotationClassesSaga(action: PayloadAction<string>) {
    yield put(setSelectedAnnotationClasses(action.payload));
}

export function* deleteAnnotationClassesSaga(action: PayloadAction<string>) {
    try {
        const classes: string[] = yield select(getAnnotationClasses);

        const updatedClasses = classes.filter(item => item !== action.payload);

        yield put(setAnnotationClasses([...updatedClasses]));
    }
    catch (e) {
        const error = (e instanceof Error) ? e.message : e;
        yield put(setAnnotationClassesError(error));
    }
}
