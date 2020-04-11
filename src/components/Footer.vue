<template>
  <div>
    <v-footer color="white" padless>
      <v-container>
        <v-row>
          <v-col cols="3" />

          <v-col cols="6" class="pt-0 d-flex justify-end">
            <router-link to="/feedback" class="custom-anchor body-2">Feedback?</router-link>
          </v-col>

          <v-col cols="3" />
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped lang="scss">
</style>