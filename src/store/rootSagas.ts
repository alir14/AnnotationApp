import { all, fork } from 'redux-saga/effects';

// Import your individual sagas
import { watchViewerSaga as viewerSaga } from './mediaAnnotation/sagas';
import { watchAnnotationClassSaga as annotationClassSaga } from './annotateClasses/sagas';

function* rootSaga() {
    yield all([
        fork(viewerSaga),
        fork(annotationClassSaga)
    ]);
}

export default rootSaga;
