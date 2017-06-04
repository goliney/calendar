<template>
  <div class="dynamic">
    <section class="week-days">
      <span v-for="weekDay in weekDaysShort">{{ weekDay }}</span>
    </section>

    <div class="month">
      <div class="week" v-for="week in monthWeeks">
        <day class="day" v-for="day in week" :date="day" :key="day" :month-mode="true"></day>
      </div>
    </div>
  </div>
</template>

<script>
import { WEEK_DAYS_SHORT } from '@/constants';
import { getWeeksOfMonth } from '@/utils';
import Day from './entities/Day';

export default {
  name: 'monthView',
  props: ['year', 'month'],
  components: {
    Day,
  },
  computed: {
    monthWeeks() {
      return getWeeksOfMonth(this.year, this.month);
    },
  },
  data() {
    return {
      weekDaysShort: WEEK_DAYS_SHORT,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.week-days {
  display: flex;

  span {
    flex: 1;
    padding-left: 5px;
  }
}

.month {
  flex: 1;
  display: flex;
  flex-direction: column;

  .week {
    display: flex;
    flex: 1;
    border: 1px solid $separator_color;
    border-right: none;

    &:not(:last-child) {
      border-bottom: none;
    }

    .day {
      flex: 1;
      border-bottom: none;
      border-top: none;
      border-left: none;
    }
  }
}
</style>
