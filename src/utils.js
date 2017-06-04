import * as constants from '@/constants';

export function getPrevDay(date) {
  date = date || new Date();
  const yesterday = new Date(date);
  return new Date(yesterday.setDate(date.getDate() - 1));
}

export function getNextDay(date) {
  date = date || new Date();
  const yesterday = new Date(date);
  return new Date(yesterday.setDate(date.getDate() + 1));
}

export function getWeekDayName(weekDayNumber) {
  return constants.WEEK_DAYS[weekDayNumber];
}

export function getShortWeekDayName(weekDayNumber) {
  return constants.WEEK_DAYS_SHORT[weekDayNumber];
}

export function getMonthName(monthDayNumber) {
  return constants.MONTH_NAMES[monthDayNumber];
}

export function getSundayBeforeDate(date) {
  date = new Date(date);
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

export function getWeeksOfMonth(year, month) {
  year = parseInt(year, 10);
  month = parseInt(month, 10);
  const weeks = [];
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  let date = getSundayBeforeDate(startOfMonth);
  while (date <= endOfMonth) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      week.push(date);
      date = getNextDay(date);
    }
    weeks.push(week);
  }
  return weeks;
}

export function getWeekNumber(date) {
  const weeks = getWeeksOfMonth(date.getFullYear(), date.getMonth());
  let count = 0;
  weeks.some((week) => {
    const found = week[0] <= date && week[6] >= date;
    count = found ? count : count + 1;
    return found;
  });
  return count;
}

export function parseDateSimple(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
}

export function parseDate(date) {
  const { year, month, day } = parseDateSimple(date);
  const week = getWeekNumber(date);
  const weekDayName = getWeekDayName(date.getDay());
  const weekDayNameShort = getShortWeekDayName(date.getDay());
  const monthName = getMonthName(month);
  return { year, month, day, week, weekDayName, weekDayNameShort, monthName };
}
