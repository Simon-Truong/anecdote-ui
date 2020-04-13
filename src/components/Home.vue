<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" />

        <v-col cols="6">
          <h2 class="pl-3">sign up</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="d-flex justify-end">
          <v-row>
            <v-col cols="6" />
            <v-col cols="6">
              <v-text-field
                class="custom-text-field"
                append-icon="fa-search"
                hint="search people, tags..."
                outlined
                persistent-hint
                dense
                autofocus
                @click:append="search"
                @keydown.enter="search"
                v-model="searchQuery"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-form>
            <v-container class="pt-0">
              <v-row>
                <v-col cols="3">
                  <v-text-field dense class="pt-0" label="First Name"></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field dense class="pt-0" label="Last Name"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field dense class="pt-0" label="Email"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field dense class="pt-0" label="Password" :type="'password'" counter></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="d-flex justify-end">
                  <v-btn tile depressed small dark color="#1976d2">Sign up</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      const q = this.searchQuery;
      const routeOptions = {
        path: 'root',
        query: {
          q
        }
      };

      this.$router.push(routeOptions);
    }
  }
};
</script>

<style scoped lang="scss">
</style>