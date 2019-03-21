import Schedule from './Schedule';

interface dailyPeriodicityInfo {
  finisher: Date;
  whichDay: number;
}

export default class DailySchedule extends Schedule {
  private whichDay: number;

  constructor (starter: Date, periodicityInfo: dailyPeriodicityInfo) {
    super (starter, periodicityInfo.finisher);
    
    this.whichDay = periodicityInfo.whichDay;

    this.dailySchedule ();
    this.periodEnd = this.getLastDate(this.schedulePeriod);
  }

  private dailySchedule (): void {
    if (this.whichDay === 0) this.dailyScheduleForEachWorkingDay();
    else if (this.whichDay > 0 && this.whichDay < 7) this.dailyScheduleForEachNthDay();
    else throw new Error('Error :: Incorrect schedule options. Days of the week for the task was not set.');
  }

  private dailyScheduleForEachWorkingDay (): void {
    this.schedulePeriod = this.currentWeekWorkingDays ();
    if (!this.schedulePeriod.length) this.schedulePeriod = this.nextWeekWorkingDays ();
  }

  private dailyScheduleForEachNthDay (): void {
    this.schedulePeriod = this.currentWeekRestNthDays ();
    if (!this.schedulePeriod.length) this.schedulePeriod = this.nextWeekNthDays ();
  }

  private currentWeekWorkingDays (): Date[] {
    const days = [];
    const weekDay = this.starter.getDay();
    const startTime = this.starter.getTime();
    for (let i = 1; weekDay + i < 6; i++) {
      days.push(new Date(startTime + this.ONE_DAY * i));
    }
  
    return days.filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  };

  private nextWeekWorkingDays (): Date[] {
    const days = [];
    const nextMonday = this.nthWeekMonday(this.starter, 1);
    const startTime = nextMonday.getTime();
  
    for (let day = 0; day < 5; day++) {
      days.push(new Date(startTime + this.ONE_DAY * day));
    }
  
    return days.filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  };

  private currentWeekRestNthDays (): Date[] {
    const days = [];
    const weekDay = this.starter.getDay();
    const startTime = this.starter.getTime();
    for (let day = this.whichDay; day < 8 - weekDay; day = day + this.whichDay) {
      days.push(new Date(startTime + this.ONE_DAY * day));
    }
  
    return days.filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  };

  private nextWeekNthDays (): Date[] {
    const days = [];
    const startTime = this.starter.getTime();
    const nextMonday = this.nthWeekMonday(this.starter, 1);
    const nextSunday = this.nthWeekSunday(this.starter, 1);
  
    for (let day = this.whichDay; day < 16; day = day + this.whichDay) {
      const someDay = new Date(startTime + this.ONE_DAY * day);
      if (this.isDateInRange(nextMonday, someDay, nextSunday)) {
        days.push(someDay);
      }
    }
  
    return days.filter(day => this.isDateBeforeTheEnd(day, this.finisher));
  };

}