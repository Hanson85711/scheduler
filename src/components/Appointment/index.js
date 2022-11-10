import "components/Appointment/styles.scss";
import React, { useState, Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
          .bookInterview(props.id, interview)
          .then(() => delay(1000).then(() => transition(SHOW)))
          .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(CONFIRMING);
  }

  function finalDelete() {

    transition(DELETING, true);

    props
    .cancelInterview(props.id, props.interview)
    .then(() => delay(1000).then(() => transition(EMPTY)))
    .catch(error => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }

  function errorSave() {
    transition(ERROR_SAVE);
  }

  function errorDelete() {
    transition(ERROR_DELETE);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message="SAVING" />}
      {mode === ERROR_SAVE && <Error message="Could not Save" onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Could not Delete" onClose={() => back()}/>}
      {mode === CONFIRMING && <Confirm 
                                  message="Are you sure you want to delete this?"
                                  onCancel={() => back()}
                                  onConfirm={finalDelete}/>}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && ( 
        <Form 
          interviewers = {props.interviewers}
          onSave = {save}
          onCancel={() => back()}
          />
      )}
      {mode === EDIT && ( 
        <Form 
          student={props.interview.student}
          interviewers = {props.interviewers}
          interviewer = {props.interview.interviewer.id}
          onSave = {save}
          errorSave={errorSave}
          onCancel={() => back()}
          />
      )}      
      {mode === SHOW && ( <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onDelete={deleteAppointment}
      errorDelete={errorDelete}
      onEdit={edit}/> )}
    </article>
    
  );
}

