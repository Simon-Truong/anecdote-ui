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
import navigationGuard from './router/navigation-guard';

export default {
  name: 'App',
  components: {
    AppBar,
    Footer
  },
  data() {
    return {};
  },
  created() {
    window.addEventListener('storage', async event => {
      if (event.key === 'logout') {
        await navigationGuard.logOut();
        this.$router.push('/');
      }
    });
  }
};
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.v-application {
  &.main {
    font-family: 'Roboto', monospace;
  }

  .custom-routerlink {
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

  .custom-anchor {
    color: #1976d2;
    font-size: 0.75rem;
  }

  .v-text-field.v-input--dense {
    &.custom-text-field {
      border-radius: 0;
      height: 2.5rem;

      .v-input__append-inner {
        .v-input__icon > .v-icon {
          margin-top: 0;
        }
      }
    }
  }

  .custom-background {
    background-color: $background-color;
  }

  .no-decoration {
    text-decoration: none;
  }

  .v-btn.v-btn--depressed.v-btn--disabled.v-btn--tile.theme--dark.v-size--small {
    background-color: $primary-disabled !important;

    .v-btn__content {
      color: white;
    }
  }

  .v-input--has-state.error--text .v-label {
    animation: none !important;
  }
}

.content {
  height: 70%;
}
</style>