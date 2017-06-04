export const ALERTS_INTERVAL = 1000 * 60 * 5; // 5min

export const WEEK_DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

export const WEEK_DAYS_SHORT = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];

export const HOURS = [
  { value: '00:00', title: '12AM' },
  { value: '01:00', title: '1AM' },
  { value: '02:00', title: '2AM' },
  { value: '03:00', title: '3AM' },
  { value: '04:00', title: '4AM' },
  { value: '05:00', title: '5AM' },
  { value: '06:00', title: '6AM' },
  { value: '07:00', title: '7AM' },
  { value: '08:00', title: '8AM' },
  { value: '09:00', title: '9AM' },
  { value: '10:00', title: '10AM' },
  { value: '11:00', title: '11AM' },
  { value: '12:00', title: '12PM' },
  { value: '13:00', title: '1PM' },
  { value: '14:00', title: '2PM' },
  { value: '15:00', title: '3PM' },
  { value: '16:00', title: '4PM' },
  { value: '17:00', title: '5PM' },
  { value: '18:00', title: '6PM' },
  { value: '19:00', title: '7PM' },
  { value: '20:00', title: '8PM' },
  { value: '21:00', title: '9PM' },
  { value: '22:00', title: '10PM' },
  { value: '23:00', title: '11PM' },
].map((hour, index) => Object.assign(hour, { time: index * 1000 * 60 * 60 }));

export const HALF_HOURS = [
  { value: '00:00', title: '12:00AM' },
  { value: '00:30', title: '12:30AM' },
  { value: '01:00', title: '1:00AM' },
  { value: '01:30', title: '1:30AM' },
  { value: '02:00', title: '2:00AM' },
  { value: '02:30', title: '2:30AM' },
  { value: '03:00', title: '3:00AM' },
  { value: '03:30', title: '3:30AM' },
  { value: '04:00', title: '4:00AM' },
  { value: '04:30', title: '4:30AM' },
  { value: '05:00', title: '5:00AM' },
  { value: '05:30', title: '5:30AM' },
  { value: '06:00', title: '6:00AM' },
  { value: '06:30', title: '6:30AM' },
  { value: '07:00', title: '7:00AM' },
  { value: '07:30', title: '7:30AM' },
  { value: '08:00', title: '8:00AM' },
  { value: '08:30', title: '8:30AM' },
  { value: '09:00', title: '9:00AM' },
  { value: '09:30', title: '9:30AM' },
  { value: '10:00', title: '10:00AM' },
  { value: '10:30', title: '10:30AM' },
  { value: '11:00', title: '11:00AM' },
  { value: '11:30', title: '11:30AM' },

  { value: '12:00', title: '12:00PM' },
  { value: '12:30', title: '12:30PM' },
  { value: '13:00', title: '1:00PM' },
  { value: '13:30', title: '1:30PM' },
  { value: '14:00', title: '2:00PM' },
  { value: '14:30', title: '2:30PM' },
  { value: '15:00', title: '3:00PM' },
  { value: '15:30', title: '3:30PM' },
  { value: '16:00', title: '4:00PM' },
  { value: '16:30', title: '4:30PM' },
  { value: '17:00', title: '5:00PM' },
  { value: '17:30', title: '5:30PM' },
  { value: '18:00', title: '6:00PM' },
  { value: '18:30', title: '6:30PM' },
  { value: '19:00', title: '7:00PM' },
  { value: '19:30', title: '7:30PM' },
  { value: '20:00', title: '8:00PM' },
  { value: '20:30', title: '8:30PM' },
  { value: '21:00', title: '9:00PM' },
  { value: '21:30', title: '9:30PM' },
  { value: '22:00', title: '10:00PM' },
  { value: '22:30', title: '10:30PM' },
  { value: '23:00', title: '11:00PM' },
  { value: '23:30', title: '11:30PM' },
].map((hour, index) => Object.assign(hour, { time: index * 1000 * 60 * 30 }));

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
