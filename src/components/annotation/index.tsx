import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAnnotationData } from '../../store/mediaAnnotation/selectors';
import { PayloadAction } from '@reduxjs/toolkit';
import * as mediaAnnotationActions from "../../store/mediaAnnotation/sagas/actions";

const AnnotationDataList = () => {
  const dispatch = useDispatch();
  const annotationList = useSelector(getAnnotationData);

  const handleOnDeleteClick = (videoTime: number) => {
    dispatch({
      payload: videoTime,
      type: mediaAnnotationActions.DELETE_ANNOTATION
    } as PayloadAction<number>)
  }

  return (
    <div className="list-group listStyle">
      {annotationList.map((annotate) => {
        return (
          <div className="list-group-item d-flex justify-content-start align-items-start" key={annotate.id}>
            <button className="btn btn-danger me-2" onClick={() => handleOnDeleteClick(annotate.id)} aria-label="delete">
              <i className="bi bi-trash"></i> {/* Bootstrap icons used here, make sure you include Bootstrap icons if not already */}
            </button>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Id: {annotate.id}</div>
              <div className="mt-2">
                <div className="mb-2">x: {annotate.startX.toFixed(2)}</div>
                <div className="mb-2">y: {annotate.startY.toFixed(2)}</div>
                <div className="mb-2">width: {(annotate.endX - annotate.startX).toFixed(2)}</div>
                <div className="mb-2">height: {(annotate.endY - annotate.startY).toFixed(2)}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

  )
}

export default AnnotationDataList;