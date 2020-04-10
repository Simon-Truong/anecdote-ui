<template>
  <div>
    <v-footer color="white" padless>
      <v-container>
        <v-row>
          <v-col col="12" class="py-0 d-flex justify-end">
            <div class="grey--text text--darken-4">&copy; {{ new Date().getFullYear() }}</div>
          </v-col>
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