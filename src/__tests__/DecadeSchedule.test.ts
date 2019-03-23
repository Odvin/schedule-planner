import DecadeSchedule from '../DecadeSchedule';

describe('Decade Schedule tests', () => {
  test(`Start from a Monday. End date is out of the periodicity range.
        Has to calculate the next tenth day from Monday.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-25T14:13:01.561Z');
    const periodicityInfo = { finisher };
    const res = new DecadeSchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual(['2019-03-21T14:13:01.561Z']);
  });

  test(`Start from a Monday. End date in the periodicity range.
        Has to return empty array.`, () => {
    const starter = new Date('2019-03-11T14:13:01.561Z');
    const finisher = new Date('2019-03-15T14:13:01.561Z');
    const periodicityInfo = { finisher };
    const res = new DecadeSchedule(starter, periodicityInfo);
    expect(res.schedulePeriodDatesISOStrings).toEqual([]);
  });
});
