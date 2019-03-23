# schedule-planner
Schedule calendar dates according to some rules of periodicity.

## Installation
```
npm i schedule-planner
```

## Usage

### Hourly schedule
To get the list of dates with an hourly schedule for the current day or the next one.

```js
const { HourlySchedule } = require 'schedule-planer'; 

const starter = new Date("2019-03-11T06:13:01.561Z"); // starting date for the schedule plan
const finisher = new Date("2019-03-11T14:13:01.561Z"); // last date
const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00']; // hh:mm 
const periodicityInfo = { finisher, whichTimes };
const res = new HourlySchedule (starter, periodicityInfo);
```
