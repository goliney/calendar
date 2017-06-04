<template>
  <div class="day" @click="addEvent()">
    <div v-if="monthMode" class="day-link">
      <a @click.stop="goToDay()">
        <span v-if="currentDay.day === 1">{{currentDay.monthName}}</span>
        {{currentDay.day}}
      </a>
    </div>
    <div class="event"
      v-if="monthMode"
      v-for="event in currentEventsLimited"
      @click.stop="editEvent(event)">
      <span class="title">{{event.title}}</span>
    </div>

    <div class="event"
      v-if="!monthMode"
      v-for="event in currentEvents"
      @click.stop="editEvent(event)">
      <span class="title">{{event.title}}</span>
    </div>

    <div v-if="monthMode && currentEvents.length > 3" class="day-link">
      <a @click.stop="goToDay()">
        + {{ currentEvents.length - 3 }} more
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import { parseDate } from '@/utils';
import bus from '@/bus';

export default {
  name: 'day',
  props: ['date', 'monthMode'],
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      events: state => state.events,
    }),
    currentDay() {
      return parseDate(this.date);
    },
    currentEvents() {
      const { year, month, day } = this.currentDay;
      const events = _.get(this.events, [year, month, day], [])
        .filter(e => this.monthMode || e.wholeDay)
        .map(e => Object.assign({}, e));
      return events;
    },
    currentEventsLimited() {
      return this.currentEvents.slice(0, 3);
    },
  },
  methods: {
    addEvent() {
      const date = this.date;
      bus.$emit('create-event', { date });
    },
    editEvent(event) {
      bus.$emit('edit-event', { event });
    },
    goToDay() {
      const { year, month, day } = this.currentDay;
      this.$router.push({
        name: 'day',
        params: { year, month, day },
      });
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/global.scss';

.day {
  display: flex;
  flex-direction: column;
  min-height: $slot_height;
  overflow: hidden;
  padding: 2px 0 7px 2px;
  border: 1px solid $separator_color;

  .day-link {
    font-size: 0.8em;
    line-height: 1.2;
    margin-bottom: 2px;

    a {
      cursor: pointer;
      color: rgba(0, 0, 0, .87) !important;

      &:hover {
        color: rgba(0, 0, 0, .87) !important;
      }
    }
  }

  .event {
    flex-shrink: 0;
    margin-bottom: 2px;

    .title {
      white-space: nowrap;
    }
  }
}
</style>
