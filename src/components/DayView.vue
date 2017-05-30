<template>
  <div>
    <section class="static">
      <span class="title">Monday, 5/29</span>
      <day id="day"></day>
    </section>

    <div class="top-border"></div>
    <main class="dynamic md-scrollbar">
      <hour-labels></hour-labels>
      <day-grid id="day-grid"></day-grid>
    </main>
  </div>
</template>

<script>
import HourLabels from './helpers/HourLabels';
import DayGrid from './entities/DayGrid';
import Day from './entities/Day';

export default {
  name: 'dayView',
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
