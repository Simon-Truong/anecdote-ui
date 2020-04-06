<template>
  <v-app>
    <v-app-bar app dark color="indigo">
      <v-toolbar-title>
        anecdote
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
