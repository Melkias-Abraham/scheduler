import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    // Upon clicking save the transition is set to save 
    transition(SAVING);

    // Only when there's a succuessful put request will the app
    // show the appointment
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  } 

  function remove () {
    transition(CONFIRM)
    // Upon clicking, the deleting status appears
    transition(DELETING)

    // Once the HTTP request is complete, show an empty component
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY) )
    // console.log(props.id)

  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => remove()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING)
            save(name, interviewer)
          }}
          // onDelete={(name, interviewer) => {
          //   remove(name, interviewer)
          // }}
        />  
      )}
      {mode === SAVING && <Status message={"Saving"} /> }
      {mode === DELETING && <Status message={"Deleting"} /> }
    </article>
  );
}
