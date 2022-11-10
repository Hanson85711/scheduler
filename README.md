# Interview Scheduler

A web app that schedules appointments for users and interviewers. Users may book themselves for an appointment in any empty timeslot by inputting their name in the form and selecting an interviewer from the interviewers list available for the selected day. 

Currently does not support user login/validation so user can currently edit any timeslot/appointment data. Utilizes separate back-end API server for it's data-fetching. Will not run properly without scheduler-api(Found here: https://github.com/lighthouse-labs/scheduler-api). 

Student project made as part of Lighthouse Labs program. 

## Screenshots
!["View of the app"](https://github.com/Hanson85711/scheduler/blob/master/docs/scheduler-normal_view.png)

!["Booking an appointment](https://github.com/Hanson85711/scheduler/blob/master/docs/scheduler-adding_view.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
