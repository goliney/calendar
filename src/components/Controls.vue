<template>
  <md-toolbar>
    <h2 class="md-title app-name">
      <md-icon>event_note</md-icon>
      Calendar
    </h2>

    <!-- navigation -->
    <nav class="prev-next">
      <!-- today -->
      <md-button class="md-raised md-dense today" @click.native="today()">
        Today
      </md-button>
      <!-- prev -->
      <md-button class="md-icon-button md-raised md-dense" @click.native="prev()">
        <md-icon>chevron_left</md-icon>
      </md-button>
      <!-- next -->
      <md-button class="md-icon-button md-raised md-dense" @click.native="next()">
        <md-icon>chevron_right</md-icon>
      </md-button>
    </nav>

    <!-- current view title -->
    <h3 class="md-subheading current-view-title">{{title}}</h3>

    <!-- year / month / week / day -->
    <md-button-toggle md-single>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('day') }" @click.native="changeMode('day')">day</md-button>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('week') }" @click.native="changeMode('week')">week</md-button>
      <md-button class="md-raised md-dense" :class="{ 'md-accent': isModeActive('month') }" @click.native="changeMode('month')">month</md-button>
    </md-button-toggle>

    <md-button class="md-raised md-dense" @click.native="exportICS()">export</md-button>
  </md-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import * as utils from '@/utils';
import ics from '@/assets/ics';

export default {
  name: 'controls',
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      events: state => state.events,
    }),
    title() {
      let result = '';
      const { year, month, week, day } = this.$route.params;
      switch (this.$route.name) {
        case 'day': {
          const weekDay = this.currentDate.getDay();
          result = `${utils.getWeekDayName(weekDay)}, ${utils.getMonthName(month)} ${day} ${year}`;
          break;
        }
        case 'week': {
          const [startDate,,,,,, endDate] = utils.getWeeksOfMonth(year, month)[week];
          const start = utils.parseDate(startDate);
          const end = utils.parseDate(endDate);
          result = `${start.monthName} ${start.day} ${start.year} – ${end.monthName} ${end.day} ${end.year}`;
          break;
        }
        case 'month': {
          result = `${utils.getMonthName(month)} ${year}`;
          break;
        }
        case 'year': {
          break;
        }
        default:
          break;
      }
      return result;
    },
    currentDate() {
      // I know we should pass params as props, but this is not a component inside router-view
      const { year, month, day } = this.$route.params;
      return new Date(year, month, day);
    },
    currentWeek() {
      return utils.getWeeksOfMonth(
        this.$route.params.year,
        this.$route.params.month,
      )[this.$route.params.week];
    },
  },
  methods: {
    today() {
      const today = new Date();
      const { year, month, day, week } = utils.parseDate(today);
      this.$router.push({ name: this.$route.name, params: { year, month, day, week } });
    },
    prev() {
      switch (this.$route.name) {
        case 'day': {
          const yesterday = utils.getPrevDay(this.currentDate);
          const { year, month, day } = utils.parseDate(yesterday);
          this.$router.push({ name: 'day', params: { year, month, day } });
          break;
        }
        case 'week': {
          const weekStart = this.currentWeek[0];
          const { year, month, week } = utils.parseDate(utils.getPrevDay(weekStart));
          this.$router.push({ name: 'week', params: { year, month, week } });
          break;
        }
        case 'month': {
          const lastDayOfPrevMonth = new Date(this.$route.params.year, this.$route.params.month, 0);
          const year = lastDayOfPrevMonth.getFullYear();
          const month = lastDayOfPrevMonth.getMonth();
          this.$router.push({ name: 'month', params: { year, month } });
          break;
        }
        default:
          break;
      }
    },
    next() {
      switch (this.$route.name) {
        case 'day': {
          const yesterday = utils.getNextDay(this.currentDate);
          const { year, month, day } = utils.parseDate(yesterday);
          this.$router.push({ name: 'day', params: { year, month, day } });
          break;
        }
        case 'week': {
          const weekEnd = this.currentWeek[6];
          const { year, month, week } = utils.parseDate(utils.getNextDay(weekEnd));
          this.$router.push({ name: 'week', params: { year, month, week } });
          break;
        }
        case 'month': {
          const currentYear = this.$route.params.year;
          const firstDayOfNextMonth = new Date(currentYear, this.$route.params.month + 1, 1);
          const year = firstDayOfNextMonth.getFullYear();
          const month = firstDayOfNextMonth.getMonth();
          this.$router.push({ name: 'month', params: { year, month } });
          break;
        }
        default:
          break;
      }
    },
    isModeActive(mode) {
      return this.$route.name === mode;
    },
    changeMode(mode) {
      const params = Object.assign({}, this.$route.params);
      switch (this.$route.name) {
        case 'day': {
          params.week = utils.getWeekNumber(this.currentDate);
          break;
        }
        case 'week': {
          params.day = this.currentWeek[0].getDate();
          break;
        }
        case 'month': {
          params.day = 1;
          params.week = 0;
          break;
        }
        case 'year': {
          break;
        }
        default:
          break;
      }
      this.$router.push({ name: mode, params });
    },
    exportICS() {
      const cal = ics();
      _.values(this.events).forEach((year) => {
        _.values(year).forEach((month) => {
          _.values(month).forEach((day) => {
            day.forEach((event) => {
              let start = new Date(event.date.year, event.date.month, event.date.day).getTime();
              let end = start;
              if (event.wholeDay) {
                end += 1000 * 60 * 60 * 24;
              } else {
                start += event.from;
                end += event.to;
              }
              cal.addEvent(event.title, '', '', new Date(start), new Date(end));
            });
          });
        });
      });
      cal.download('calendar');
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
