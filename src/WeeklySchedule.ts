import Schedule from './Schedule';

interface IWeeklyPeriodicityInfo {
  finisher: Date;
  whichWeek: number;
  whichDays: number[];
}

export default class WeeklySchedule extends Schedule {
  private whichWeek: number;
  private whichDays: number[];

  /**
   * Weekly schedule plan.
   * @constructor
   * @param starter - starting date for the schedule plan
   * @param weeklyPeriodicityInfo - weekly schedule options
   *
   * @interface IWeeklyPeriodicityInfo
   * @param whichWeek - n-th next week
   * @param whichDays - ISO days of the week
   * @param finisher - last day for the schedule plan
   */
  constructor(starter: Date, periodicityInfo: IWeeklyPeriodicityInfo) {
    super(starter, periodicityInfo.finisher);

    this.whichWeek = periodicityInfo.whichWeek;
    this.whichDays = periodicityInfo.whichDays;

    this.weeklySchedule();
    this.periodEnd = this.getLastDate(this.schedulePeriod);
  }

  private weeklySchedule(): void {
    const weekMonday = this.nthWeekMonday(this.starter, this.whichWeek);
    const startTime = weekMonday.getTime();

    this.schedulePeriod = this.whichDays
      .map(day => new Date(startTime + this.ONE_DAY * (day - 1)))
      .filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  }
}
