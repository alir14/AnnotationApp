import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAnnotationClasses } from '../../store/annotateClasses/selectors';
import { PayloadAction } from '@reduxjs/toolkit';
import * as classActions from "../../store/annotateClasses/sagas/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

const ClassModal = () => {
    const dispatch = useDispatch();
    const classList = useSelector(getAnnotationClasses);

    const [className, setClassName] = useState<string>('');

    const handleAddClass = () => {
        dispatch({
            payload: className,
            type: classActions.SET_ANNOTATION_CLASSES
        } as PayloadAction<string>)

        setClassName('');
    }

    const handlClassNameTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    }

    const handleDeleteClass = (value: string) => {
        dispatch({
            payload: value,
            type: classActions.DELETE_ANNOTATION_CLASSES
        } as PayloadAction<string>)
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <input className="form-control" type="text" placeholder="annotation class" value={className} onChange={handlClassNameTextChange} />
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-success" onClick={handleAddClass}>Success</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className='classList'>
                                {classList.map(item => {
                                    return (
                                        <li>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        {item}
                                                    </div>
                                                    <div className="col">
                                                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteClass(item)}>
                                                            <FontAwesomeIcon icon={faRemove} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </li>
                                    )
                                })}
                            </ul>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassModal;
