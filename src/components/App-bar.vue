<template>
  <div>
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
              <router-link to="/root?q=" class="custom-anchor">browse</router-link>
              <span> | </span>
              <router-link to="/about" class="custom-anchor">about</router-link>
              <span> | </span>
              <router-link to="/login" class="custom-anchor">login</router-link>
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
  name: 'Appbar'
};
</script>

<style scoped lang="scss">
</style>