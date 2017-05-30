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
      path: '/:year',
      name: 'year',
      component: YearView,
    },
    {
      path: '/:year/:month',
      name: 'month',
      component: MonthView,
    },
    {
      path: '/:year/:month/:start-:end',
      name: 'week',
      component: WeekView,
    },
    {
      path: '/:year/:month/:day',
      name: 'day',
      component: DayView,
    },
    {
      path: '',
      redirect() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        return { name: 'day', params: { year, month, day } };
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
