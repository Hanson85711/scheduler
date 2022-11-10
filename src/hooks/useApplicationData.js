// const   axios = require("axios");
import axios from "axios";
const { useState, useEffect } = require("react");


export default function useApplicationData() {

  const [state, setState] = useState({ 
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const makeDaysCopy = function (appointments) {
    let newArray = [];
    for (const objectDay of state.days) {
      if (objectDay.name === state.day) {
        let currentAppointmentsKeys = objectDay.appointments;
        newArray.push({...objectDay, spots:calcAppointments(appointments, currentAppointmentsKeys)});
      } else {
        newArray.push({...objectDay});
      }
    }
    return newArray;
  }

  const calcAppointments = function (appointments, keys) {
    let count = 0;
    for (const key of keys) {
      if (appointments[key].interview === null) {
        count += 1;
      }
    }
    return count;
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const setDay = day => setState({ ...state, day });

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = makeDaysCopy(appointments);
  
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days: newDays })  
      })
  }

  const cancelInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = makeDaysCopy(appointments);

    return axios.delete(`/api/appointments/${id}`, interview)
      .then(() => {
        setState({...state,appointments, days: newDays})
      })
  }

  return {state, setDay, bookInterview, cancelInterview}
}