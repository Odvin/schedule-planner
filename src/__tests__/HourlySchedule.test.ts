import  HourlySchedule  from '../HourlySchedule';

describe("Hourly Schedule tests", () => {
  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the same day date with time 11:00, 15:00, 17:00.`, () => {
    const starter = new Date("2019-03-11T08:13:01.561Z");
    const finisher = new Date("2019-03-25T09:13:01.561Z");
    const whichTimes = ['11:00', '15:00', '17:00'];
    const periodicityInfo = { finisher, whichTimes };
    const res = new HourlySchedule (starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-11T09:00:01.561Z',
      '2019-03-11T13:00:01.561Z',
      '2019-03-11T15:00:01.561Z',
    ]);
  });

  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the same day date with time: 15:00, 17:00.`, () => {
    const starter = new Date("2019-03-11T09:13:01.561Z");
    const finisher = new Date("2019-03-25T14:13:01.561Z");
    const whichTimes = ['06:00', '09:25', '11:00', '15:00', '17:00'];
    const periodicityInfo = { finisher, whichTimes };
    const res = new HourlySchedule (starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-11T13:00:01.561Z',
      '2019-03-11T15:00:01.561Z',
    ]);
  });

  test(`Start from a Monday. End date is in the periodicity range.
        Has to calculate the same day date with time: 09:25, 10:26, 15:00.`, () => {
    const starter = new Date("2019-03-11T06:13:01.561Z");
    const finisher = new Date("2019-03-11T14:13:01.561Z");
    const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
    const periodicityInfo = { finisher, whichTimes };
    const res = new HourlySchedule (starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-11T07:25:01.561Z',
      '2019-03-11T08:26:01.561Z',
      '2019-03-11T13:00:01.561Z',
    ]);
  });

  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the next day date
        with time: '06:00', '09:25', '10:26', '15:00', '17:00'.`, () => {
    const starter = new Date("2019-03-11T21:13:01.561Z");
    const finisher = new Date("2019-03-23T14:13:01.561Z");
    const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
    const periodicityInfo = { finisher, whichTimes };
    const res = new HourlySchedule (starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T04:00:01.561Z',
      '2019-03-12T07:25:01.561Z',
      '2019-03-12T08:26:01.561Z',
      '2019-03-12T13:00:01.561Z',
      '2019-03-12T15:00:01.561Z',
    ]);
  });

  test(`Start from a Monday.
        End date is in the periodicity range. 
        Has to calculate the next day date 
        with time: '06:00', '09:25', '10:26'.`, () => {
    const starter = new Date("2019-03-11T21:13:01.561Z");
    const finisher = new Date("2019-03-12T08:30:01.561Z");
    const whichTimes = ['06:00', '09:25', '10:26', '15:00', '17:00'];
    const periodicityInfo = { finisher, whichTimes };
    const res = new HourlySchedule (starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T04:00:01.561Z',
      '2019-03-12T07:25:01.561Z',
      '2019-03-12T08:26:01.561Z',
    ]);
  });
});
