import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day); 

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Changes State
    // setState({
    //   ...state,
    //   appointments
    // });

    // Makes our data persistent
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview } )
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const cancelInterview = (id) => {

    // copy the appointment state, overwrite interview value to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };


    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { appointment } )
      .then(() => {
        setState({
          ...state,
          appointment
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
    <Appointment
     key={appointment.id}
     id={appointment.id}
     time={appointment.time}
     interview={interview}
     interviewers={dailyInterviewers}
     bookInterview={bookInterview}
     cancelInterview={cancelInterview}
    />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            // setDay={day => console.log(day)} was used to see the click day on console
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
