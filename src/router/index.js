import Vue from 'vue';
import Router from 'vue-router';
import { parseDateSimple, getWeeksOfMonth } from '../utils';
import YearView from '../components/YearView';
import MonthView from '../components/MonthView';
import WeekView from '../components/WeekView';
import DayView from '../components/DayView';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/:year(\\d+)',
      name: 'year',
      component: YearView,
      props: true,
    },
    {
      path: '/:year(\\d{4})/:month(\\d{1,2})',
      name: 'month',
      component: MonthView,
      props: true,
    },
    {
      path: '/:year(\\d{4})/:month(\\d{1,2})/week/:week(\\d{1,2})',
      name: 'week',
      component: WeekView,
      props: true,
    },
    {
      path: '/:year(\\d{4})/:month(\\d{1,2})/:day(\\d{1,2})',
      name: 'day',
      component: DayView,
      props: true,
    },
    {
      path: '',
      redirect() {
        const today = new Date();
        const { year, month, day } = parseDateSimple(today);
        return { name: 'day', params: { year, month, day } };
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const toYear = parseInt(to.params.year, 10);
  const toMonth = parseInt(to.params.month, 10);
  const toWeek = parseInt(to.params.week, 10);
  const toDay = parseInt(to.params.day, 10) || 1;
  let invalidParams = false;
  if (to.name === 'week') {
    const weeks = getWeeksOfMonth(toYear, toMonth);
    invalidParams = weeks.length - 1 < toWeek;
  } else {
    const target = new Date(toYear, toMonth, toDay);
    const { year, month, day } = parseDateSimple(target);
    invalidParams = year !== toYear || month !== toMonth || day !== toDay;
  }
  if (invalidParams) {
    next('/');
  } else {
    next();
  }
});

export default router;
