<template>
  <menu>
    <md-button>Default</md-button>
    <md-button class="md-primary">Primary</md-button>
    <md-button class="md-accent">Accent</md-button>
    <md-button class="md-warn">Warn</md-button>
    <md-button class="md-primary" disabled>Disabled</md-button>
    <md-button class="md-dense">Dense</md-button>
  </menu>
</template>

<script>
export default {
  name: 'controls',
  components: [
    'md-button',
  ],
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/global.scss';

menu {
  margin: 0;
  padding: 0;
}
</style>
