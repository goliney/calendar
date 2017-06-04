import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import Push from 'push.js';
import { ALERTS_INTERVAL } from '@/constants';

Vue.use(Vuex);

const calendar = new Vuex.Store({
  state: {
    count: 0,
    events: {},
  },

  getters: {
  },

  mutations: {
    addEvent(state, { event }) {
      const { year, month, day } = event.date;
      if (!state.events[year]) {
        Vue.set(state.events, year, {});
      }
      if (!state.events[year][month]) {
        Vue.set(state.events[year], month, {});
      }
      if (!state.events[year][month][day]) {
        Vue.set(state.events[year][month], day, []);
      }
      const dayEvents = state.events[year][month][day];

      let index = 0;

      dayEvents.some((e) => {
        const found = e.from > event.from;
        if (!found) {
          index += 1;
        }
        return found;
      });

      event.id = state.count;
      event.notified = false;
      dayEvents.splice(index, 0, event);
      state.count += 1;
    },

    editEvent(state, { event }) {
      const { year, month, day } = event.date;
      const dayEvents = state.events[year][month][day];
      const e = _.find(dayEvents, { id: event.id });
      const index = _.indexOf(dayEvents, e);
      dayEvents.splice(index, 1, event);
    },

    deleteEvent(state, { event }) {
      const { year, month, day } = event.date;
      const dayEvents = _.get(state.events, [year, month, day]);
      const e = _.find(dayEvents, { id: event.id });
      if (e) {
        dayEvents.splice(_.indexOf(dayEvents, e), 1);
      }
    },

    notify(state, { event }) {
      if (!event.notified) {
        Vue.set(event, 'notified', true);
        Push.create(event.title, { body: 'Event starts soon', timeout: 5000 });
      }
    },
  },

  actions: {
    addEvent({ state, commit, dispatch }, { event }) {
      commit({ type: 'addEvent', event });
      dispatch({ type: 'checkAlerts' });
      window.localStorage.setItem('calendar', JSON.stringify(state));
    },
    editEvent({ state, commit, dispatch }, { event }) {
      commit({ type: 'deleteEvent', event });
      commit({ type: 'addEvent', event });
      dispatch({ type: 'checkAlerts' });
      window.localStorage.setItem('calendar', JSON.stringify(state));
    },
    deleteEvent({ state, commit }, { event }) {
      commit({ type: 'deleteEvent', event });
      window.localStorage.setItem('calendar', JSON.stringify(state));
    },
    checkAlerts({ state, commit }) {
      _.values(state.events).forEach((year) => {
        _.values(year).forEach((month) => {
          _.values(month).forEach((day) => {
            day.forEach((event) => {
              const eventDay = new Date(event.date.year, event.date.month, event.date.day);
              const start = eventDay.getTime() + event.from;
              const diff = start - new Date();
              if (diff > 0 && diff < ALERTS_INTERVAL * 2) {
                commit({ type: 'notify', event });
              }
            });
          });
        });
      });
    },
  },
});

export default calendar;
