import React, { ChangeEvent, useRef } from 'react';
import AnnotationPlayer from './components/player';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import * as mediaAnnotationActions from "./store/mediaAnnotation/sagas/actions";
import AnnotationDataList from './components/annotation';
import TopMenu from './components/topMenu';
import "./App.css";
import "./bootstrap.scss";
import AnnotationClassSidebar from './components/annotationClassSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import ClassModal from './components/classModal';
import WarningMessage from './components/warningComponent';
import { useSelector } from 'react-redux';
import { getSaveValidationFlag } from './store/mediaAnnotation/selectors';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const saveValidationFlag = useSelector(getSaveValidationFlag);

    const playerComponentRef = useRef<any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const newVideoURL = URL.createObjectURL(file);

            dispatch({
                type: mediaAnnotationActions.SET_MEDIA_FILE_URL,
                payload: newVideoURL
            } as PayloadAction<string>);

            if (playerComponentRef.current) {
                playerComponentRef.current.focus();
            }
        }
    };

    return (
        <div className="d-flex">
            {/* modal */}
            {saveValidationFlag && <WarningMessage message='Please select a class first.' />}

            <ClassModal />
            <div className="container">
                <div className="row">
                    <p>Classes</p>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
                <div className="row scrollable-sidebar">
                    <AnnotationClassSidebar />
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col-12">
                        <div className="p-2 border bg-light">
                            <TopMenu handleFileChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="p-2 border bg-light">
                            <AnnotationPlayer ref={playerComponentRef} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col">
                        <div className="p-2 border bg-light scrollable-sidebar">
                            <AnnotationDataList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
