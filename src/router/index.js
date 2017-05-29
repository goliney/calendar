import Vue from 'vue';
import Router from 'vue-router';
import YearView from '../components/YearView';
import MonthView from '../components/MonthView';
import WeekView from '../components/WeekView';
import DayView from '../components/DayView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/year',
      name: 'year',
      component: YearView,
    },
    {
      path: '/month',
      name: 'month',
      component: MonthView,
      alias: '/',
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView,
    },
    {
      path: '/day',
      name: 'day',
      component: DayView,
      alias: '/',
    },
  ],
});
