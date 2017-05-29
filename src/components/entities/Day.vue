<template>
  <div class="day"></div>
</template>

<script>

export default {
  name: 'day',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.day {
  display: flex;
  flex-direction: column;
  min-height: $slot_height / 2;
}
</style>
