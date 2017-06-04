<template>
  <section>
    <div class="hour-label" v-for="label in hours">{{label.title}}</div>
  </section>
</template>

<script>
import { HOURS } from '@/constants';

export default {
  name: 'hourLabels',
  data() {
    return {
      hours: HOURS,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

section {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 60px;
}

.hour-label {
  flex-basis: $slot_height * 2;
  flex-shrink: 0;
  border: 1px solid $separator_color;
  border-top: none;
  font-size: 0.8em;
  text-align: right;
  padding: 2px;

  &:last-of-type {
    border-bottom: 1px solid $separator_color;
  }

}

</style>
