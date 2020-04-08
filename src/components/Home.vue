<template>
  <div class="custom-background">
    <v-container>
      <v-row>
        <v-col cols="6" sm="6" md="3">
          <v-text-field label="Solo" placeholder="search..." solo><i class="fas fa-search"></i></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {}
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.custom-background {
  background-color: $background-color;
  height: 100%;
}
</style>