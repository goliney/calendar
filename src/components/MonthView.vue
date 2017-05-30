<template>
  <div class="dynamic">
    <section class="week-days">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </section>

    <div class="month">
      <div class="week">
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
      </div>
      <div class="week">
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
      </div>
      <div class="week">
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
      </div>
      <div class="week">
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
      </div>
      <div class="week">
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
        <day></day>
      </div>
    </div>
  </div>
</template>

<script>
import Day from './entities/Day';

export default {
  name: 'monthView',
  components: {
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
      border-right: 1px solid $separator_color;
    }
  }
}
</style>
