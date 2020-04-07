<template>
  <v-app>
    <v-app-bar app dark color="teal darken-4">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-toolbar-title>anecdote</v-toolbar-title>
          </v-col>

          <v-col cols="6" />

          <v-col cols="3">
            <div>
              <router-link to="/about" class="mr-2">About</router-link>
              <router-link to="/signup" class="mr-2">Sign Up</router-link>
              <router-link to="/login">Login</router-link>
          </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
};
</script>
