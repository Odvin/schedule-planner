export default class Schedule {
  protected periodEnd: Date;
  protected schedulePeriod: Date[];
  
  protected starter: Date;
  protected finisher: Date;

  protected ONE_DAY: number = 86400000;
  protected ONE_WEEK: number = 604800000;

  constructor (starter: Date, finisher: Date) {
    this.schedulePeriod = [];
    this.starter = starter;
    this.finisher = finisher;
    this.periodEnd = starter;
  }
  /**
   * @returns Dates for appropriate schedule period
   */
  public get schedulePeriodDates (): Date[] {
    return this.schedulePeriod;
  }
  /**
   * @returns DateISOStrings for appropriate schedule period
   */
  public get schedulePeriodDatesISOStrings (): string[] {
    return this.schedulePeriod.map(day => day.toISOString());
  }
  /**
   * @returns The last date fro appropriate schedule period
   */
  public get periodEndDate (): Date {
    return this.periodEnd;
  }
  /**
   * @returns The last dateISOString fro appropriate schedule period
   */
  public get periodEndDateISOString (): string {
    return this.periodEnd.toISOString();
  }

  protected nthWeekMonday = (date: Date, week: number): Date => {
    const weekDay = date.getDay();
    const weekISODay = weekDay === 0 ? 7 : weekDay;
    const startTime = date.getTime();
    return new Date(startTime + this.ONE_DAY * (1 - weekISODay) + this.ONE_WEEK * week);
  }

  protected nthWeekSunday = (date: Date, week: number): Date => {
    const nextMonday = this.nthWeekMonday(date, week);
    const startTime = nextMonday.getTime();
    return new Date(startTime + this.ONE_DAY * 6);
  }

  protected isDateBeforeTheEnd = (date: Date, lastDate: Date): boolean => {
    return date.getTime() <= lastDate.getTime();
  };

  protected getLastDate = (dates: Date[]): Date => {
    const datesTime = dates.map(day => day.getTime());
    const lastTime = Math.max(...datesTime);
    return new Date(lastTime);
  };

  protected isDateInRange = (leftDate: Date, date: Date, rightDate: Date): boolean => {
    const a = leftDate.getTime();
    const x = date.getTime();
    const b = rightDate.getTime();
    return a <= x && x <= b;
  };
}