import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import "./annotationClasses.css";
import { useSelector } from 'react-redux';
import { getAnnotationClasses, getSelectedAnnotationClass } from '../../store/annotateClasses/selectors';
import * as actions from '../../store/annotateClasses/sagas/actions';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';

const AnnotationClassSidebar = () => {
  const dispatch = useDispatch();
  const classList = useSelector(getAnnotationClasses);

  const selectedClass = useSelector(getSelectedAnnotationClass);

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      payload: event.target.value,
      type: actions.SET_SELETED_ANNOTATION_CLASSES
    } as PayloadAction<string>)
  };

  return (
    <Form className='classForm'>
      {classList.map((className, index) => (
        <div key={className} className="mb-3">
          <Form.Check
            type="radio"
            id={`radio-${className}`}
            label={className}
            name="classGroup"
            value={className}
            checked={selectedClass === className}
            onChange={handleClassChange}
          />
        </div>
      ))}
    </Form>
  );
};

export default AnnotationClassSidebar;