<template>
  <v-app class="main">
    <AppBar />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import AppBar from './components/Appbar';
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

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.main {
  font-family: 'Inconsolata', 'Roboto', monospace;
  background-color: $background-color;
}
</style>