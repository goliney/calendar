<template>
  <div id="app">
    <controls></controls>
    <router-view class="main-view"></router-view>
    <event-edit></event-edit>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import VueMaterial from 'vue-material';
import Push from 'push.js';
import 'vue-material/dist/vue-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import Controls from './components/Controls';
import EventEdit from './components/EventEdit';

Vue.use(VueMaterial);

export default {
  name: 'app',
  components: {
    Controls,
    EventEdit,
  },
  computed: {
    ...mapState({
      events: state => state.events,
    }),
  },
  mounted() {
    Push.Permission.request();
    setInterval(() => {
      this.$store.dispatch({ type: 'checkAlerts' });
    }, 1000 * 60);
  },
};
</script>

<style lang="scss">
@import '~assets/scss/global';

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1024px;
  min-height: 600px;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 2px;

  .static {
    display: flex;
    flex-direction: column;
    max-height: 50%;
    margin-right: $scrollbar_with_margin;
  }

  .dynamic {
    flex: 1;
    overflow: auto;
    padding-right: 8px;
  }
}
</style>
