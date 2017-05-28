import Vue from 'vue';
import Router from 'vue-router';
import Year from '../components/Year';
import Month from '../components/Month';
import Week from '../components/Week';
import Day from '../components/Day';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/year',
      name: 'year',
      component: Year,
    },
    {
      path: '/month',
      name: 'month',
      component: Month,
      alias: '/',
    },
    {
      path: '/week',
      name: 'week',
      component: Week,
    },
    {
      path: '/day',
      name: 'day',
      component: Day,
      alias: '/',
    },
  ],
});
