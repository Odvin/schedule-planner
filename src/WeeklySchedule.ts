import Schedule from './Schedule';

interface weeklyPeriodicityInfo {
  finisher: Date;
  whichWeek: number;
  whichDays: number[];

}

export default class WeeklySchedule extends Schedule {
  private whichWeek: number;
  private whichDays: number[];
  
  constructor (starter: Date, periodicityInfo: weeklyPeriodicityInfo) {
    super(starter, periodicityInfo.finisher);

    this.whichWeek = periodicityInfo.whichWeek;
    this.whichDays = periodicityInfo.whichDays;

    this.weeklySchedule();
    this.periodEnd = this.getLastDate(this.schedulePeriod);
    this.isScheduleFinished = this.isDateBeforeTheEnd(this.periodEnd, this.finisher);
  }

  // static createPlan(starter: Date, periodicityInfo: weeklyPeriodicityInfo): WeeklySchedule {
  //   return new this(starter, periodicityInfo);
  // }

  private weeklySchedule(): void {
    const weekMonday = this.nthWeekMonday(this.starter, this.whichWeek);
    const startTime = weekMonday.getTime();

    this.schedulePeriod = this.whichDays
      .map(day => new Date(startTime + this.ONE_DAY * (day - 1)))
      .filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  }
}