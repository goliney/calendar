import Vue from 'vue';
import Router from 'vue-router';
import { parseDate } from '../utils';
import YearView from '../components/YearView';
import MonthView from '../components/MonthView';
import WeekView from '../components/WeekView';
import DayView from '../components/DayView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:year',
      name: 'year',
      component: YearView,
      props: true,
    },
    {
      path: '/:year/:month',
      name: 'month',
      component: MonthView,
      props: true,
    },
    {
      path: '/:year/:month/week/:week',
      name: 'week',
      component: WeekView,
      props: true,
    },
    {
      path: '/:year/:month/:day',
      name: 'day',
      component: DayView,
      props: true,
    },
    {
      path: '',
      redirect() {
        const today = new Date();
        const { year, month, day } = parseDate(today);
        return { name: 'day', params: { year, month, day } };
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
