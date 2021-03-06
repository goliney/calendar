// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import _ from 'lodash';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

// Restore state from localStorage
const calendar = JSON.parse(window.localStorage.getItem('calendar'));
if (calendar) {
  _.values(calendar.events).forEach((year) => {
    _.values(year).forEach((month) => {
      _.values(month).forEach((day) => {
        day.forEach((event) => {
          store.dispatch({ type: 'addEvent', event });
        });
      });
    });
  });
}

// Service worker stuff

const isProduction = process.env.NODE_ENV === 'production';

if ('serviceWorker' in navigator && isProduction) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service worker has been successfully registered');
  }).catch((e) => {
    console.error('Error during service worker registration:', e);
  });
} else {
  const reason = isProduction
    ? 'Service worker is not supported'
    : 'Running in dev mode. Service worker isn\'t registered';
  console.log(reason);
}

/*
  To unregister service workers:

  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister()
    }
  })

 */
