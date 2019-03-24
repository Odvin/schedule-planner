import DailySchedule from '../DailySchedule';

describe('Daily Schedule tests', () => {
  test(`Start from a Monday. End date is out of the week.
        Has to calculate the same week working days from Tuesday up to Friday included.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-20T14:13:01.561Z');
    const whichDay = 0;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
      '2019-03-14T14:13:01.561Z',
      '2019-03-15T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-15T14:13:01.561Z');
  });

  test(`Start from a Monday. End date in the week.
        Has to calculate the same week working days from Tuesday up to Thursday included.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-14T14:13:01.561Z');
    const whichDay = 0;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
      '2019-03-14T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-14T14:13:01.561Z');
  });

  test(`Start from a Wednesday. End date is out of the week.
        Has to calculate the same week working days from Thursday up to Friday included.`, () => {
    const starter = new Date('2019-03-13T14:13:01.561Z');
    const finisher = new Date('2019-03-25T14:13:01.561Z');
    const whichDay = 0;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-14T14:13:01.561Z', '2019-03-15T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-15T14:13:01.561Z');
  });

  test(`Start from a Monday. End date is out of the week.
        Has to calculate the same week all days from Tuesday up to Sunday included.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-20T14:13:01.561Z');
    const whichDay = 1;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
      '2019-03-14T14:13:01.561Z',
      '2019-03-15T14:13:01.561Z',
      '2019-03-16T14:13:01.561Z',
      '2019-03-17T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-17T14:13:01.561Z');
  });

  test(`Start from a Monday. End date is Saturday.
        Has to calculate the same week all days from Tuesday up to Saturday included.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-16T14:13:01.561Z');
    const whichDay = 1;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
      '2019-03-14T14:13:01.561Z',
      '2019-03-15T14:13:01.561Z',
      '2019-03-16T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-16T14:13:01.561Z');
  });

  test(`Start from a Friday. End date is out of the week.
        Has to calculate the same week all days from Saturday up to Sunday included.`, () => {
    const starter = new Date('2019-03-15T14:13:01.561Z');
    const finisher = new Date('2019-03-25T14:13:01.561Z');
    const whichDay = 1;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-16T14:13:01.561Z', '2019-03-17T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-17T14:13:01.561Z');
  });

  test(`Start from a Monday. End date is out of the week.
        Has to calculate the same week each second days Wednesday, Friday, Sunday.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-20T14:13:01.561Z');
    const whichDay = 2;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-13T14:13:01.561Z',
      '2019-03-15T14:13:01.561Z',
      '2019-03-17T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-17T14:13:01.561Z');
  });

  test(`Start from a Monday. End date is Saturday.
        Has to calculate the same week each second days Wednesday, Friday.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-16T14:13:01.561Z');
    const whichDay = 2;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-13T14:13:01.561Z', '2019-03-15T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-15T14:13:01.561Z');
  });

  test(`Start from a Friday. End date is out of the week.
        Has to calculate the same week each second days - Sunday.`, () => {
    const starter = new Date('2019-03-15T14:13:01.561Z');
    const finisher = new Date('2019-03-25T14:13:01.561Z');
    const whichDay = 2;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-17T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-17T14:13:01.561Z');
  });

  test(`Start from a Monday. End date is out of the week.
        Has to calculate the same week each third days Thursday, Sunday.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-20T14:13:01.561Z');
    const whichDay = 3;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-14T14:13:01.561Z', '2019-03-17T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-17T14:13:01.561Z');
  });

  test(`Start from a weekend. End date is out of the week.
        Has to calculate next week working days from Monday up to Friday included.`, () => {
    const starter = new Date('2019-03-09T14:13:01.561Z');
    const finisher = new Date('2019-03-18T14:13:01.561Z');
    const whichDay = 0;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-11T14:13:01.561Z',
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
      '2019-03-14T14:13:01.561Z',
      '2019-03-15T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-15T14:13:01.561Z');
  });

  test(`Start from a weekend. End date in the week.
        Has to calculate next same week working days from Monday up to Wednesday included.`, () => {
    const starter = new Date('2019-03-10T14:13:01.561Z');
    const finisher = new Date('2019-03-13T14:13:01.561Z');
    const whichDay = 0;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([
      '2019-03-11T14:13:01.561Z',
      '2019-03-12T14:13:01.561Z',
      '2019-03-13T14:13:01.561Z',
    ]);
    expect(res.periodEndDateISOString).toBe('2019-03-13T14:13:01.561Z');
  });

  test(`Start from a Thursday. End date out of the week.
        Has to calculate next week fifth days: Tuesday.`, () => {
    const starter = new Date('2019-03-21T14:13:01.561Z');
    const finisher = new Date('2019-03-30T14:13:01.561Z');
    const whichDay = 5;
    const periodicityInfo = { finisher, whichDay };
    const res = new DailySchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-26T14:13:01.561Z']);
    expect(res.periodEndDateISOString).toBe('2019-03-26T14:13:01.561Z');
  });
});
