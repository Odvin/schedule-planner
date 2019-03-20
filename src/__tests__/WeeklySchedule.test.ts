import { WeeklySchedule } from '../index';

describe("Weekly Schedule tests", () => {
  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the next week all days from Monday up to Sunday included.`, () => {
    const starter = new Date("2019-03-11T14:13:01.561Z");
    const finisher = new Date("2019-03-25T14:13:01.561Z");
    const whichWeek = 1;
    const whichDays = [1, 2, 3, 4, 5, 6, 7];
    const periodicityInfo = { whichWeek, whichDays, finisher };
    const res = new WeeklySchedule(starter, periodicityInfo);

    expect(res.schedulePeriodDatesISOStrings()).toEqual([
      "2019-03-18T14:13:01.561Z",
      "2019-03-19T14:13:01.561Z",
      "2019-03-20T14:13:01.561Z",
      "2019-03-21T14:13:01.561Z",
      "2019-03-22T14:13:01.561Z",
      "2019-03-23T14:13:01.561Z",
      "2019-03-24T14:13:01.561Z"
    ]);
    
    expect(res.workerExecutionDateISOString()).toBe("2019-03-24T14:13:01.561Z");
  });

  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the next week: Monday, Wednesday, Friday, Sunday.`, () => {
    const starter = new Date("2019-03-11T14:13:01.561Z");
    const finisher = new Date("2019-03-25T14:13:01.561Z");
    const whichWeek = 1;
    const whichDays = [1, 3, 5, 7];
    const periodicityInfo = { whichWeek, whichDays, finisher };
    const res = WeeklySchedule.createPlan(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings()).toEqual([
      "2019-03-18T14:13:01.561Z",
      "2019-03-20T14:13:01.561Z",
      "2019-03-22T14:13:01.561Z",
      "2019-03-24T14:13:01.561Z"
    ]);
    expect(res.workerExecutionDateISOString()).toBe("2019-03-24T14:13:01.561Z");
  });

  test(`Start from a Wednesday. End date is out of the periodicity range.
        Has to calculate the second week: Tuesday, Friday.`, () => {
    const starter = new Date("2019-03-13T14:13:01.561Z");
    const finisher = new Date("2019-03-31T14:13:01.561Z");
    const whichWeek = 2;
    const whichDays = [2, 5];
    const periodicityInfo = { whichWeek, whichDays, finisher };
    const res = WeeklySchedule.createPlan(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings()).toEqual([
      "2019-03-26T14:13:01.561Z",
      "2019-03-29T14:13:01.561Z"
    ]);
    expect(res.workerExecutionDateISOString()).toBe("2019-03-29T14:13:01.561Z");
  });

  test(`Start from a Wednesday. End date is in periodicity range.
        Has to calculate the third week: Monday, Tuesday, Saturday.`, () => {
    const starter = new Date("2019-03-04T14:13:01.561Z");
    const finisher = new Date("2019-03-30T14:13:01.561Z");
    const whichWeek = 3;
    const whichDays = [1, 2, 6, 7];
    const periodicityInfo = { whichWeek, whichDays, finisher };
    const res = WeeklySchedule.createPlan(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings()).toEqual([
      "2019-03-25T14:13:01.561Z",
      "2019-03-26T14:13:01.561Z",
      "2019-03-30T14:13:01.561Z"
    ]);
    expect(res.workerExecutionDateISOString()).toBe("2019-03-30T14:13:01.561Z");
  });
});