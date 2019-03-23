import Schedule from './Schedule';

interface IHourlyPeriodicityInfo {
  finisher: Date;
  whichTimes: string[];
}

export default class HourlySchedule extends Schedule {
  private whichTimes: string[];
  constructor(starter: Date, periodicityInfo: IHourlyPeriodicityInfo) {
    super(starter, periodicityInfo.finisher);

    this.whichTimes = periodicityInfo.whichTimes;

    this.hourlySchedule();
    this.periodEnd = this.getLastDate(this.schedulePeriod);
  }

  private hourlySchedule(): void {
    this.currentDayHourlySchedule();

    if (!this.schedulePeriod.length) {
      this.nextDayHourlySchedule();
    }
  }

  private currentDayHourlySchedule(): void {
    const startTime = this.starter.getTime();

    this.schedulePeriod = this.whichTimes
      .map(time => {
        const [hour, min] = time.split(':');
        const day = new Date(startTime);
        return new Date(day.setHours(parseInt(hour, 10), parseInt(min, 10)));
      })
      .filter(day => this.isDateBeforeTheEnd(this.starter, day) && this.isDateBeforeTheEnd(day, this.finisher));
  }

  private nextDayHourlySchedule() {
    const startTime = this.starter.getTime();

    this.schedulePeriod = this.whichTimes
      .map(time => {
        const [hour, min] = time.split(':');
        const day = new Date(startTime + this.ONE_DAY);
        return new Date(day.setHours(parseInt(hour, 10), parseInt(min, 10)));
      })
      .filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  }
}
