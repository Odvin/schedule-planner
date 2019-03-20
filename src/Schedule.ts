export default class Schedule {
  protected periodEnd: Date;
  protected schedulePeriod: Date[];
  protected isScheduleFinished: boolean;
  
  protected starter: Date;
  protected finisher: Date;

  protected ONE_DAY: number = 86400000;
  protected ONE_WEEK: number = 604800000;

  constructor (starter: Date, finisher: Date) {
    this.schedulePeriod = [];
    this.starter = starter;
    this.finisher = finisher;
    this.isScheduleFinished = true;
    this.periodEnd = starter;
  }

  public get schedulePeriodDates (): Date[] {
    return this.schedulePeriod;
  }

  public get schedulePeriodDatesISOStrings (): string[] {
    return this.schedulePeriod.map(day => day.toISOString());
  }

  public get scheduleFinishedStatus (): boolean {
    return this.isScheduleFinished;
  }

  public get periodEndDate (): Date {
    return this.periodEnd;
  }

  protected nthWeekMonday = (date: Date, week: number): Date => {
    const weekDay = date.getDay();
    const weekISODay = weekDay === 0 ? 7 : weekDay;
    const startTime = date.getTime();
    return new Date(startTime + this.ONE_DAY * (1 - weekISODay) + this.ONE_WEEK * week);
  }

  protected isDateBeforeTheEnd = (date: Date, lastDate: Date): boolean => {
    return date.getTime() <= lastDate.getTime();
  };

  protected getLastDate = (dates: Date[]): Date => {
    const datesTime = dates.map(day => day.getTime());
    const lastTime = Math.max(...datesTime);
    return new Date(lastTime);
  };
}