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

export function getInterviewersForDay(state, day) {
  const answer = [];
  for (const objectDay of state.days) {
    if (objectDay.name === day) {
      for (const interviewerNum of objectDay.interviewers) {
        answer.push(state.interviewers[interviewerNum]);
      }
    } 
  }

  return answer; 
}

export function getInterview(state, interview) {
  const interviewData = {};
  if (interview) {
    const interviewNum = interview.interviewer;
    interviewData.student = interview.student;
    interviewData.interviewer = state.interviewers[interviewNum];
    return interviewData;
  }

  return null;
}

