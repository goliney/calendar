<template>
  <div>
    <section class="static">
      <span class="title">{{ title }}</span>
      <day id="day" :date="date"></day>
    </section>

    <div class="top-border"></div>
    <main class="dynamic md-scrollbar">
      <hour-labels></hour-labels>
      <day-grid id="day-grid" :date="date"></day-grid>
    </main>
  </div>
</template>

<script>
import { parseDate } from '@/utils';

import HourLabels from './helpers/HourLabels';
import DayGrid from './entities/DayGrid';
import Day from './entities/Day';

export default {
  name: 'dayView',
  props: ['year', 'month', 'day'],
  components: {
    HourLabels,
    DayGrid,
    Day,
  },
  computed: {
    date() {
      return new Date(this.year, this.month, this.day);
    },
    parsedDay() {
      return parseDate(this.date);
    },
    title() {
      return `${this.parsedDay.weekDayName}, ${this.parsedDay.month + 1}/${this.parsedDay.day}`;
    },
  },
  data() {
    return {
    };
  },

};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.static {
  margin-left: 59px;
  margin-bottom: 5px;

  .title {
    display: block;
    margin-bottom: 5px;
    text-align: center;
  }

  #day {
    padding: 1px 0 0 2px;
    border: 1px solid $separator_color;
  }
}

main {
  display: flex;

  #day-grid {
    flex: 1;
  }
}
</style>
