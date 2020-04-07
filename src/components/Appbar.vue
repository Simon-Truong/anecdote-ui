<template>
  <v-app-bar app dark color="teal darken-4">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-toolbar-title>
            <router-link to="/home" class="custom-anchor">
              <span class="grey--text text--lighten-5">anecdote</span>
            </router-link>
          </v-toolbar-title>
        </v-col>

        <v-col cols="6" />

        <v-col cols="3">
          <div>
            <router-link to="/about" class="custom-anchor mr-2">About</router-link>
            <router-link to="/signup" class="custom-anchor mr-2">Sign Up</router-link>
            <router-link to="/login" class="custom-anchor">Login</router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
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
  color: #BDBDBD;
  transition-duration: 0.5s;

    &:hover {
      color: #FAFAFA;
    }
}
</style>