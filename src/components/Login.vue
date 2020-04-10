<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" />

        <v-col cols="6">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="4" />

                <v-col cols="4">
                  <v-text-field label="First Name"></v-text-field>
                </v-col>

                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="pt-0">
                  <v-text-field class="pt-0" label="Last Name"></v-text-field>
                </v-col>

                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="d-flex justify-end">
                  <v-btn tile depressed small dark color="#1976d2">Login</v-btn>
                </v-col>

                <v-col cols="4" />
              </v-row>
            </v-container>
          </v-form>
        </v-col>

        <v-col cols="3" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style>
</style>