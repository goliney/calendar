<template>
  <section>
    <div class="hour-label" v-for="label in hours">{{label}}</div>
  </section>
</template>

<script>
const HOURS = [
  '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
  '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM',
];
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
  flex-basis: $slot_height;
  flex-shrink: 0;
  border: 1px solid $separator_color;
  border-bottom: none;
  font-size: 0.8em;
  text-align: right;
  padding: 2px;

  &:first-of-type {
   border-top: none;
  }

  &:last-of-type {
    border-bottom: 1px solid $separator_color;
  }

}

</style>
