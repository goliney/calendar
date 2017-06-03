import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const calendar = new Vuex.Store({
  state: {
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
      state.events[year][month][day].push(event);
    },

    editEvent(state, { event, newData }) {
      Object.assign(event, newData);
    },
  },

  actions: {
    addEvent({ commit }, { event }) {
      commit({ type: 'addEvent', event });
    },
  },
});

export default calendar;
