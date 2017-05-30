<template>
  <div>
    <section class="static">
      <div class="day-wrap">
        <span class="title">Mon, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Tue, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Wed, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Thu, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Fri, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Sat, 5/29</span>
        <day class="week-day"></day>
      </div>
      <div class="day-wrap">
        <span class="title">Sun, 5/29</span>
        <day class="week-day"></day>
      </div>
    </section>

    <div class="top-border"></div>
    <main class="dynamic md-scrollbar">
      <hour-labels></hour-labels>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
      <day-grid class="day-grid"></day-grid>
    </main>
  </div>
</template>

<script>
import HourLabels from './helpers/HourLabels';
import DayGrid from './entities/DayGrid';
import Day from './entities/Day';

export default {
  name: 'weekView',
  components: {
    HourLabels,
    DayGrid,
    Day,
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
  }

  .day-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;

    .week-day {
      padding: 1px 0 0 2px;
      border: 1px solid $separator_color;
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

    .hour {
      border-left: none;
    }
  }
}
</style>
