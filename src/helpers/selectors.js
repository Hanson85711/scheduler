export function getAppointmentsForDay(state, day) {
  const answer = [];
  for (const objectDay of state.days) {
    if (objectDay.name === day) {
      for (const appointNum of objectDay.appointments) {
        answer.push(state.appointments[appointNum]);
      }
    } 
  }
  return answer; 
}

