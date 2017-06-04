<template>
  <div class="day-grid">
    <div class="half" v-for="half in half_hours" @click="addEvent(half)"></div>
    <div
      class="event"
      v-for="event in currentEvents"
      v-bind:class="{ overlap: event.overlaps.before > 0 }"
      v-bind:style="event.style"
      @click="editEvent(event)">
      <strong class="time">{{event.labelFrom}} - {{event.labelTo}}</strong>
      <span class="title">{{event.title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import { HALF_HOURS } from '@/constants';
import { parseDate } from '@/utils';
import bus from '@/bus';

const HOUR_HEIGHT = 40;
const DAY_HEIGHT = HOUR_HEIGHT * 24;
const HOUR_DURATION = 1000 * 60 * 60;
const DAY_DURATION = HOUR_DURATION * 24;

function getHeightFromDuration(duration) {
  return (duration * DAY_HEIGHT) / DAY_DURATION;
}

function locateIntersected(event, events) {
  const index = _.indexOf(events, event);
  const before = events.filter((e, i) => {
    return i < index && e.from <= event.from && e.to > event.from;
  });
  const after = events.filter((e, i) => {
    return i > index && e.from >= event.from && e.from < event.to;
  });

  event.overlaps = {
    before: before.length,
    after: after.length,
    total: before.length + after.length,
  };
}

function setEventStyles(events) {
  events.forEach((event) => {
    locateIntersected(event, events);
    const level = event.overlaps.total ? 95 / (event.overlaps.total + 1) : 0;
    event.style = {
      top: `${getHeightFromDuration(event.from)}px`,
      height: `${getHeightFromDuration(event.to - event.from) - 2}px`,
      right: `${5 + (5 * event.overlaps.after)}%`,
      left: `${event.overlaps.before * level}%`,
    };
  });
}

export default {
  name: 'dayGrid',
  props: ['date'],
  data() {
    return {
      half_hours: HALF_HOURS,
    };
  },
  computed: {
    ...mapState({
      events: state => state.events,
    }),
    currentEvents() {
      const { year, month, day } = parseDate(this.date);
      const events = _.get(this.events, [year, month, day], [])
        .filter(e => !e.wholeDay)
        .map(e => Object.assign({}, e));
      setEventStyles(events);
      return events;
    },
  },
  methods: {
    addEvent(half) {
      const date = this.date;
      bus.$emit('create-event', { date, half });
    },
    editEvent(event) {
      bus.$emit('edit-event', { event });
    },
    deleteEvent(event) {
      this.$store.dispatch({ type: 'deleteEvent', event });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.day-grid {
  position: relative;
}

.half {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: $slot_height;
  border: 1px solid $separator_color;
  border-top: none;
  border-left: none;

  &.active {
    background-color: $slot_bg;
  }

  &:nth-child(odd) {
    border-bottom: 1px dotted $separator_color;
  }
}

.event {
  position: absolute;
}
</style>
