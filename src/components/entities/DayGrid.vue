<template>
  <div class="day-grid">
    <div class="hour" v-for="hour in hours">
      <div class="half"></div>
      <div class="half"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dayGrid',
  data() {
    return {
      hours: new Array(24),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.hour {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: $slot_height;
  border: 1px solid $separator_color;
  border-bottom: none;

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
</style>
