import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  // Used to set the current day
  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Makes our data persistent
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview } )
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
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
  }

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

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;