<template>
  <md-toolbar>
    <h2 class="md-title app-name">
      <md-icon>event_note</md-icon>
      Calendar
    </h2>

    <!-- navigation -->
    <nav class="prev-next">
      <!-- today -->
      <md-button class="md-raised md-dense today" @click.native="prev()">
        Today
        <md-tooltip md-direction="bottom">Go to today's date</md-tooltip>
      </md-button>
      <!-- prev -->
      <md-button class="md-icon-button md-raised md-dense" @click.native="prev()">
        <md-icon>chevron_left</md-icon>
        <md-tooltip md-direction="bottom">Previous</md-tooltip>
      </md-button>
      <!-- next -->
      <md-button class="md-icon-button md-raised md-dense" @click.native="next()">
        <md-icon>chevron_right</md-icon>
        <md-tooltip md-direction="bottom">Next</md-tooltip>
      </md-button>
    </nav>

    <!-- current view title -->
    <h3 class="md-subheading current-view-title">May 2017</h3>

    <!-- year / month / week / day -->
    <md-button-toggle md-single>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('year') }" @click.native="changeMode('year')">year</md-button>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('month') }" @click.native="changeMode('month')">month</md-button>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('week') }" @click.native="changeMode('week')">week</md-button>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('day') }" @click.native="changeMode('day')">day</md-button>
    </md-button-toggle>
  </md-toolbar>
</template>

<script>
export default {
  name: 'controls',
  data() {
    return {
    };
  },
  methods: {
    prev() {
      console.log('aaaa');
    },
    next() {
      console.log('bbbb');
    },
    isModeActive(mode) {
      return this.$route.name === mode;
    },
    changeMode(mode) {
      this.$router.push({ name: mode });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

.md-toolbar {
  display: flex;
  margin: 0;
  padding: 0 32px;

  .app-name {
    margin-left: 0;
  }

  nav {
    display: flex;
    align-items: center;
    margin: 0 32px;

  .today {
    margin-right: 16px;
  }
  }

  .current-view-title {
    flex: 1;
  }
}
</style>
