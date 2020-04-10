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

  data: () => ({
    //
  })
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
    transition-duration: 0.5s;

    &.router-link-active {
      color: $primary;
    }

    &:hover {
      color: $primary;
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