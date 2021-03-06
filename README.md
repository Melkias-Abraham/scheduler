# Interview Scheduler

  Interview Scheduler is a booking app that allows students to book interview sessions with a mentor Monday through Friday 12pm-5pm. The app is able to handle bookings, along with cancellations, that get updated in real time with a daily interview spot counter on the side bar for each day. A student is not only able to book a interview with their perfered interviewer, but also edit & delete them as well.

  Interview Scheduler was built through React and uses PostgreSQL as the interview database. The app and database are connected through a Websocket server which get updated through axios HTTP requests.

## ScreenShots
The initial homepage for Interviewer Scheduler
!["The initial homepage for Interviewer Scheduler"](https://github.com/96sMicks/scheduler/blob/master/docs/Initial%20Homepage.png)

A new appointment being created
!["A new appointment being created"](https://github.com/96sMicks/scheduler/blob/master/docs/Booking%20an%20Appointment.png)

A new appointment booked
!["A new appointment booked"](https://github.com/96sMicks/scheduler/blob/master/docs/A%20new%20Appointment%20is%20created.png)

A user editing their appointment with a new mentor
!["A user editing their appointment with a new mentor"](https://github.com/96sMicks/scheduler/blob/master/docs/A%20user%20editing%20their%20appointment%20with%20a%20new%20mentor.png)

An appointment edited with a new mentor
!["An appointment edited with a new mentor"](https://github.com/96sMicks/scheduler/blob/master/docs/A%20new%20appointment%20edited%20with%20a%20new%20mentor.png)

A user deleting their appointment
!["A user deleting their appointment"](https://github.com/96sMicks/scheduler/blob/master/docs/A%20user%20deleteing%20their%20appointment.png)

The app after a deletion
!["The app after a deletion"](https://github.com/96sMicks/scheduler/blob/master/docs/Initial%20Homepage.png)


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

## Dependencies
-React
-React-dom
-React-hooks-testing-library
-React-test-renderer
-Axios
-PostgreSQL
-classnames
-normailze.css
-babel
-jest
