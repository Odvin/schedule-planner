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
const { HourlySchedule } = require('schedule-planner'); 

// For the current day
const starter = new Date(2018, 03, 10, 09, 10, 0);
const finisher = new Date(2018, 03, 10, 16, 00, 0);
const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
const periodicityInfo = { finisher, whichTimes };
const hourly = new HourlySchedule (starter, periodicityInfo);
const arrayOfScheduledDates = hourly.schedulePeriodDates;

console.log(arrayOfScheduledDates.toLocaleString());
// 2018-4-10 09:25:00,
// 2018-4-10 10:26:00,
// 2018-4-10 15:00:00


// For the next day
const starter = new Date(2018, 03, 10, 22, 00, 0);
const finisher = new Date(2018, 03, 11, 16, 00, 0);
const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
const periodicityInfo = { finisher, whichTimes };
const hourly = new HourlySchedule (starter, periodicityInfo);
const arrayOfScheduledDates = hourly.schedulePeriodDates;

console.log(arrayOfScheduledDates.toLocaleString());
// 2018-4-11 06:00:00,
// 2018-4-11 09:25:00,
// 2018-4-11 10:26:00,
// 2018-4-11 15:00:00
```

Generate the array of Date objects for the starter day with the defined time or for the next day if the starter time is above times in the list.

