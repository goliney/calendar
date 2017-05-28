<template>
  <div id="app">
    <controls></controls>
    <router-view></router-view>
  </div>
</template>

<script>
import Controls from './components/Controls';

export default {
  name: 'app',
  components: {
    Controls,
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
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: Arial, sans-serif;
  font-size: 14px;
}
</style>
