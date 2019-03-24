# schedule-planner
Schedule calendar dates according to some rules of periodicity.

Lets to create:
* Hourly schedule
* Daily schedule
* Weekly schedule
* Decade schedule

## Installation
```
npm i schedule-planner
```

## Usage

### Hourly schedule
Generate the array of Date objects for the starter day with the defined time or for the next day if the starter time is above times in the list.

```js
const { HourlySchedule } = require('schedule-planner'); 

// For the current day
const starter = new Date(2018, 03, 10, 09, 10, 0);
const finisher = new Date(2018, 03, 10, 16, 00, 0);
const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
const periodicityInfo = { finisher, whichTimes };
const hourly = new HourlySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = hourly.schedulePeriodDates;
const lastDayInSchedule = hourly.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2018-4-10 09:25:00,
// 2018-4-10 10:26:00,
// 2018-4-10 15:00:00

console.log(lastDayInSchedule.toLocaleString());
 // 2018-4-10 15:00:00


// For the next day
const starter = new Date(2018, 03, 10, 22, 00, 0);
const finisher = new Date(2018, 03, 11, 16, 00, 0);
const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
const periodicityInfo = { finisher, whichTimes };
const hourly = new HourlySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = hourly.schedulePeriodDates;
const lastDayInSchedule = hourly.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2018-4-11 06:00:00,
// 2018-4-11 09:25:00,
// 2018-4-11 10:26:00,
// 2018-4-11 15:00:00

console.log(lastDayInSchedule.toLocaleString());
 // 2018-4-11 15:00:00
```

### Daily schedule
Generate the array of Date objects from the next day of starter week up to the end of the week or for the next week if it is not possible.

```js
const { DailySchedule } = require('schedule-planner');

// For the same week
const starter = new Date(2019, 02, 11, 22, 00, 0); // Monday
const finisher = new Date(2019, 02, 20, 16, 00, 0);
const whichDay = 0; // For each working day
const periodicityInfo = { finisher, whichDay };
const daily = new DailySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = daily.schedulePeriodDates;
const lastDayInSchedule = daily.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-12 22:00:00 --- Tuesday, 
// 2019-3-13 22:00:00 --- Wednesday 
// 2019-3-14 22:00:00 --- Thursday,
// 2019-3-15 22:00:00 --- Friday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-15 22:00:00 --- Friday



// For the same week
const starter = new Date(2019, 02, 13, 22, 00, 0); // Wednesday
const finisher = new Date(2019, 02, 20, 16, 00, 0);
const whichDay = 1; // For each day of the week from the starter
const periodicityInfo = { finisher, whichDay };
const daily = new DailySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = daily.schedulePeriodDates;
const lastDayInSchedule = daily.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-14 22:00:00 --- Thursday,
// 2019-3-15 22:00:00 --- Friday,
// 2019-3-16 22:00:00 --- Saturday,
// 2019-3-17 22:00:00 --- Sunday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-17 22:00:00 --- Sunday


// For the same week
const starter = new Date(2019, 02, 11, 22, 00, 0); // Monday
const finisher = new Date(2019, 02, 16, 16, 00, 0); // Saturday
const whichDay = 2; // For each second day of the week from the starter
const periodicityInfo = { finisher, whichDay };
const daily = new DailySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = daily.schedulePeriodDates;
const lastDayInSchedule = daily.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-13 22:00:00 --- Tuesday,
// 2019-3-15 22:00:00 --- Friday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-15 22:00:00 --- Friday


// For the next week
const starter = new Date(2019, 02, 16, 22, 00, 0); // Saturday
const finisher = new Date(2019, 02, 27, 16, 00, 0); 
const whichDay = 3; // For the third day from the starter
const periodicityInfo = { finisher, whichDay };
const daily = new DailySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = daily.schedulePeriodDates;
const lastDayInSchedule = daily.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-19 22:00:00 --- next week Tuesday,
// 2019-3-22 22:00:00 --- next week Friday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-22 22:00:00 --- next week Friday
```

### Weekly schedule
Generate the array of Date objects for the n-th week from the starter with defined days of the week.

```js
const { WeeklySchedule } = require('schedule-planner'); 

const starter = new Date(2019, 02, 11, 10, 00, 0); // Monday
const finisher = new Date(2019, 02, 27, 16, 00, 0); 
const whichWeek = 1; // First next week from the starter
const whichDays = [1, 2, 3, 4, 5, 6, 7]; // All days of the week 
const periodicityInfo = { whichWeek, whichDays, finisher };
const weekly = new WeeklySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = weekly.schedulePeriodDates;
const lastDayInSchedule = weekly.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-18 10:00:00 --- next week Monday,
// 2019-3-19 10:00:00 --- next week Tuesday,
// 2019-3-20 10:00:00 --- next week Wednesday,
// 2019-3-21 10:00:00 --- next week Thursday,
// 2019-3-22 10:00:00 --- next week Friday,
// 2019-3-23 10:00:00 --- next week Saturday,
// 2019-3-24 10:00:00 --- next week Sunday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-24 10:00:00 --- next week Sunday



const starter = new Date(2019, 02, 15, 10, 00, 0); // Friday
const finisher = new Date(2019, 02, 29, 16, 00, 0); 
const whichWeek = 2; // Second next week from the starter
const whichDays = [2, 3, 5, 7]; // ISO days of the week 
const periodicityInfo = { whichWeek, whichDays, finisher };
const weekly = new WeeklySchedule (starter, periodicityInfo);

const arrayOfScheduledDates = weekly.schedulePeriodDates;
const lastDayInSchedule = weekly.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-26 10:00:00 --- next second week Tuesday,
// 2019-3-27 10:00:00 --- next second week Wednesday,
// 2019-3-29 10:00:00 --- next second week Friday

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-29 10:00:00 --- next second week Friday
```

### Decade schedule
Generate the next 10th day from the starter if it is before the finisher.

```js
const { DecadeSchedule } = require('schedule-planner');

const starter = new Date(2019, 02, 10, 10, 00, 0);
const finisher = new Date(2019, 02, 29, 16, 00, 0); 
const periodicityInfo = { finisher };
const decade = new DecadeSchedule (starter, periodicityInfo);

const arrayOfScheduledDates = decade.schedulePeriodDates;
const lastDayInSchedule = decade.periodEndDate;

console.log(arrayOfScheduledDates.toLocaleString());
// 2019-3-20 10:00:00

console.log(lastDayInSchedule.toLocaleString());
// 2019-3-20 10:00:00
```