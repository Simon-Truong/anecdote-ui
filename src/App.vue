<template>
  <v-app class="main">
    <AppBar />

    <v-content>
      <router-view class="content custom-background" />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/App-bar';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    AppBar,
    Footer
  },

  data() {
    return {}
  }
};
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.v-application {
  &.main {
    font-family: 'Roboto', monospace;
  }

  .custom-anchor {
    text-decoration: none;
    cursor: pointer;
    color: $grey-darken-1;

    &.router-link-active:not(.main-heading) {
      text-decoration: underline;
    }

    &:hover {
      color: $primary;
      transition-duration: 0.5s;
    }
  }

  .custom-text-field {
    border-radius: 0;
  }

  .custom-background {
    background-color: $background-color;
  }
}

.content {
  height: 70%;
}
</style>