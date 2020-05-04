<template>
  <div v-if="['verify'].indexOf($route.name) === -1">
    <v-footer color="white" padless>
      <v-container>
        <v-row>
          <v-col cols="3" />

          <v-col cols="6" class="pt-0 d-flex justify-end">
            <router-link
              v-if="isAuthenticated"
              to="/feedback"
              class="custom-routerlink body-2"
            >Feedback?</router-link>
          </v-col>

          <v-col cols="3" />
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped lang="scss">
</style>