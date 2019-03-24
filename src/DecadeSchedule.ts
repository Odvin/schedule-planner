import Schedule from './Schedule';

interface IDecadePeriodicityInfo {
  finisher: Date;
}

export default class DecadeSchedule extends Schedule {
  /**
   * Decade schedule plan.
   * @constructor
   * @param starter - starting date for the schedule plan
   * @param periodicityInfo - weekly schedule options
   *
   * @interface IDecadePeriodicityInfo
   * @param finisher - last day for the schedule plan
   */
  constructor(starter: Date, periodicityInfo: IDecadePeriodicityInfo) {
    super(starter, periodicityInfo.finisher);

    this.decadeSchedule();
    this.periodEnd = this.getLastDate(this.schedulePeriod);
  }

  private decadeSchedule(): void {
    const startTime = this.starter.getTime();

    this.schedulePeriod = [new Date(startTime + this.ONE_DAY * 10)].filter(day =>
      this.isDateBeforeTheEnd(day, this.finisher),
    );
  }
}
