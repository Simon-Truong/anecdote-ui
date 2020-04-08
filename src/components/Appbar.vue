<template>
  <div>
    <v-app-bar app light flat>
      <v-container>
        <v-row>
          <v-col cols="3" />

          <v-col cols="3">
            <v-toolbar-title>
              <router-link to="/home" class="custom-anchor">
                <span class="grey--text text--darken-4">anecdote</span>
              </router-link>
            </v-toolbar-title>
          </v-col>

          <v-col cols="3">
            <div class="text-right">
              <router-link to="/about" class="custom-anchor mr-2">About</router-link>
              <router-link to="/login" class="custom-anchor">Login</router-link>
            </div>
          </v-col>

          <v-col cols="3" />
        </v-row>

        <v-row>
          <v-divider />
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
.custom-anchor {
  text-decoration: none;
  cursor: pointer;
  color: #757575;
  transition-duration: 0.5s;

  &:hover {
    color: #424242;
  }
}
</style>