<template>
  <md-dialog ref="dialog">
    <md-dialog-title>
      <span v-if="isEdit">Edit Event at</span>
      <span v-else>New Event at</span>
      {{date.month + 1}}/{{date.day}}/{{date.year}}
    </md-dialog-title>

    <md-dialog-content>
      <form>
        <md-input-container>
          <label>Title</label>
          <md-input v-model="title"></md-input>
        </md-input-container>

        <md-switch v-model="wholeDay" @change="wholeDayChange()" id="whole-day-switch" class="md-primary whole-day-switch">
          Whole day
        </md-switch>

        <md-layout :md-gutter="24">
          <md-layout>
            <md-input-container>
              <label>From</label>
              <md-select v-model="from" :disabled="wholeDay">
                <md-option v-for="opt in options.from" :key="opt.value" :value="opt.time">{{opt.title}}</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
          <md-layout>
            <md-input-container>
              <label>To</label>
              <md-select v-model="to" :disabled="wholeDay">
                <md-option v-for="opt in availableOptionsTo" :key="opt.value" :value="opt.time">{{opt.title}}</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
        </md-layout>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-warn" v-if="isEdit" @click.native="deleteEvent()">Delete</md-button>
      <md-button class="md-primary" @click.native="closeDialog()">Cancel</md-button>
      <md-button class="md-primary" @click.native="saveEvent()">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import _ from 'lodash';
import { HALF_HOURS } from '@/constants';
import { parseDate } from '@/utils';
import bus from '@/bus';

export default {
  name: 'day',
  data() {
    return {
      event: null,

      isEdit: false,
      cached: {
        from: 0,
        to: 0,
      },
      date: {},
      title: '',
      from: 0,
      to: 0,
      wholeDay: false,
      options: {
        from: [...HALF_HOURS],
        to: [...HALF_HOURS],
      },
    };
  },
  watch: {
    from() {
      if (this.duration < 1000 * 60 * 30 && !this.wholeDay) {
        this.to = this.from + (1000 * 60 * 30);
      }
    },
  },
  computed: {
    availableOptionsTo() {
      return this.options.to.filter(i => i.time > this.from || this.wholeDay);
    },
    duration() {
      return this.to - this.from;
    },
  },
  mounted() {
    bus.$on('create-event', ({ date, half }) => {
      this.event = null;
      this.date = parseDate(date);
      this.title = 'New Event';
      if (half) {
        this.from = half.time;
        this.to = half.time + (1000 * 60 * 60);
        this.wholeDay = false;
      } else {
        this.wholeDay = true;
      }
      this.isEdit = false;
      this.openDialog();
    });
    bus.$on('edit-event', ({ event }) => {
      this.event = event;
      this.date = event.date;
      this.title = event.title;
      this.from = event.from;
      this.to = event.to;
      this.wholeDay = event.wholeDay;
      this.isEdit = true;
      this.openDialog();
    });
  },
  methods: {
    openDialog() {
      this.$refs.dialog.open();
    },
    closeDialog() {
      this.$refs.dialog.close();
    },
    saveEvent() {
      if (this.isEdit) {
        this.$store.dispatch({
          type: 'editEvent',
          event: {
            id: this.event.id,
            date: this.date,
            title: this.title,
            from: this.from,
            to: this.to,
            labelFrom: _.find(HALF_HOURS, i => i.time === this.from).title,
            labelTo: _.find(HALF_HOURS, i => i.time === this.to).title,
            wholeDay: this.wholeDay,
          },
        });
      } else {
        this.$store.dispatch({
          type: 'addEvent',
          event: {
            date: this.date,
            title: this.title,
            from: this.from,
            to: this.to,
            labelFrom: _.find(HALF_HOURS, i => i.time === this.from).title,
            labelTo: _.find(HALF_HOURS, i => i.time === this.to).title,
            wholeDay: this.wholeDay,
          },
        });
      }
      this.$refs.dialog.close();
    },
    deleteEvent() {
      this.$store.dispatch({ type: 'deleteEvent', event: this.event });
      this.$refs.dialog.close();
    },
    wholeDayChange() {
      if (!this.wholeDay) {
        this.cached.from = this.from;
        this.cached.to = this.to;
        this.from = 0;
        this.to = 0;
      } else {
        this.from = this.cached.from;
        this.to = this.cached.to || this.from + (1000 * 60 * 60);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/global.scss';

.md-dialog {
  width: 600px;
}

.whole-day-switch {
  margin-bottom: 40px;
}
</style>
