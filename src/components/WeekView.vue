<template>
  <div>
    <section class="static">
      <div class="day-wrap" v-for="day in parsedWeekDays">
        <router-link class="title" :to="{ name: 'day', params: { year, month, day: day.day }}">{{day.title}}</router-link>
        <day class="week-day" :date="day.date"></day>
      </div>
    </section>

    <div class="top-border"></div>
    <main class="dynamic md-scrollbar">
      <hour-labels></hour-labels>
      <day-grid v-for="day in parsedWeekDays" class="day-grid" :key="day.title" :date="day.date"></day-grid>
    </main>
  </div>
</template>

<script>
import { parseDate, getWeeksOfMonth } from '@/utils';
import HourLabels from './helpers/HourLabels';
import DayGrid from './entities/DayGrid';
import Day from './entities/Day';

export default {
  name: 'weekView',
  props: ['year', 'month', 'week'],
  components: {
    HourLabels,
    DayGrid,
    Day,
  },
  computed: {
    weekDays() {
      return getWeeksOfMonth(this.year, this.month)[this.week];
    },
    parsedWeekDays() {
      return this.weekDays.map((date) => {
        const parsedDate = parseDate(date);
        Object.assign(parsedDate, {
          date,
          title: `${parsedDate.weekDayNameShort}, ${parsedDate.month + 1}/${parsedDate.day}`,
        });
        return parsedDate;
      });
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
  flex-direction: row;
  margin-left: 59px;
  margin-bottom: 5px;

  .title {
    display: block;
    margin-bottom: 5px;
    text-align: center;
    color: rgba(0, 0, 0, .87);

    &:hover {
      color: rgba(0, 0, 0, .87);
    }
  }

  .day-wrap {
    width: 14.285%;
    display: flex;
    flex-direction: column;

    .week-day {
      flex: 1;
    }

    &:not(:last-child) .week-day {
      border-right: none;
    }
  }
}

main {
  display: flex;

  .day-grid {
    flex: 1;
  }
}
</style>
