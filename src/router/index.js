import Vue from 'vue';
import Router from 'vue-router';
import Month from '../components/Month';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Month',
      component: Month,
    },
  ],
});
