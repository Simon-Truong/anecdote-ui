<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" />

        <v-col cols="6">
          <h1 class="pl-3">sign up</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="d-flex justify-end">
          <v-row>
            <v-col cols="6" />
            <v-col cols="6">
              <v-text-field
                class="custom-text-field"
                outlined
                append-icon="fa-search"
                hint="search people, interests..."
                persistent-hint
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-form>
            <v-container class="pt-0">
              <v-row>
                <v-col cols="3">
                  <v-text-field class="pt-0" label="First Name"></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field class="pt-0" label="Last Name"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field class="pt-0" label="Email"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field class="pt-0" label="Password" :type="'password'" counter></v-text-field>
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
  data() {}
};
</script>

<style scoped lang="scss">
</style>