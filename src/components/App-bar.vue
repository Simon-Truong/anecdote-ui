<template>
  <div v-if="['verify'].indexOf($route.name) === -1">
    <v-app-bar app light>
      <v-container>
        <v-row>
          <v-col cols="3" />

          <v-col cols="3">
            <v-toolbar-title>
              <router-link to="./" class="custom-anchor main-heading">
                <span class="grey--text text--darken-4">anecdote</span>
              </router-link>
            </v-toolbar-title>
          </v-col>

          <v-col cols="3">
            <div class="text-right">
              <nav>
                <ul>
                  <div v-if="!isAuthenticated">
                    <li v-for="route in guestRoutes" :key="route.label">
                      <router-link :to="route.link" class="custom-anchor">{{ route.label }}</router-link>
                    </li>
                  </div>

                  <div v-if="isAuthenticated">
                    <li v-for="route in authenticatedRoutes" :key="route.label">
                      <router-link :to="route.link" class="custom-anchor">{{ route.label }}</router-link>
                    </li>
                  </div>
                </ul>
              </nav>
            </div>
          </v-col>

          <v-col cols="3" />
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Appbar',
  data() {
    return {
      guestRoutes: [
        {
          label: 'browse',
          link: '/browse?q='
        },
        {
          label: 'about',
          link: '/about'
        },
        {
          label: 'login',
          link: '/login'
        }
      ],
      authenticatedRoutes: [
        {
          label: 'browse',
          link: '/browse?q='
        },
        {
          label: 'profile',
          link: '/profile'
        },
        {
          label: 'about',
          link: '/about'
        },
        {
          label: 'logout',
          link: '/logout'
        }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  ul {
    list-style-type: none;

    li {
      display: inline;
    }

    li + li:before {
      content: '|';
      color: black;
      padding: 0 5px;
    }
  }
}
</style>