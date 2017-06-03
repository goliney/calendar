<template>
  <div class="day-grid">
    <div class="hour" v-for="hour in hours" @click="addEvent(hour)">
      <div class="half"></div>
      <div class="half"></div>
    </div>
    <div class="event" v-for="event in currentEvents" v-bind:style="event.style">
      <span class="time">{{event.labelFrom}} - {{event.labelTo}}</span>
      <span class="title">{{event.title}}</span> {{event.style}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import { HOURS } from '@/constants';
import { parseDate } from '@/utils';
import bus from '@/bus';

const HOUR_HEIGHT = 40;
const DAY_HEIGHT = HOUR_HEIGHT * 24;
const HOUR_DURATION = 1000 * 60 * 60;
const DAY_DURATION = HOUR_DURATION * 24;

function getHeightFromDuration(duration) {
  return (duration * DAY_HEIGHT) / DAY_DURATION;
}

function setEventStyles(events) {
  events.forEach((event) => {
    event.style = {
      top: `${getHeightFromDuration(event.from)}px`,
      height: `${getHeightFromDuration(event.to - event.from)}px`,
      width: `${95}%`,
    };
  });
}

export default {
  name: 'dayGrid',
  props: ['date'],
  data() {
    return {
      hours: HOURS,
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
      return _.orderBy(events, 'start');
    },
  },
  methods: {
    addEvent(hour) {
      const date = this.date;
      bus.$emit('create-event', { date, hour });
    },
    editEvent(event) {
      bus.$emit('edit-event', { event });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.day-grid {
  position: relative;
}

.hour {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: $slot_height;
  border: 1px solid $separator_color;
  border-bottom: none;
  border-left: none;

  &.active {
    background-color: $slot_bg;
  }

  &:first-of-type {
    border-top: none;
  }

  &:last-of-type {
    border-bottom: 1px solid $separator_color;
  }

  .half {
    flex: 1;

    &:first-child {
      border-bottom: 1px dotted $separator_color;
    }
  }
}

.event {
  position: absolute;
  border: 1px solid #A9ABFE;
  background-color: #E3E3FF;
  font-size: 0.8em;
  overflow: hidden;
  padding: 2px;

  .time {
    display: block;
    white-space: nowrap;
    height: 14px;
    line-height: 14px;
  }

  .title {
    word-wrap: break-word;
  }
}
</style>
