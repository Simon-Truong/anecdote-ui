<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-card light flat tile min-height="200" min-width="800">
            <v-card-title>Verification</v-card-title>
            <v-card-subtitle class="pb-0">Enter the code that was sent to your email</v-card-subtitle>
            <v-card-text>
              <v-container class="pl-0 pb-0">
                <v-row>
                  <v-col cols="3">
                    <v-text-field dense label="Enter your code here" v-model="secretCode"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-btn tile depressed small dark color="#1976d2" @click="verify">Verify</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import apiClient from '../service/user.service';

export default {
  name: 'Verify',
  data() {
    return {
      secretCode: ''
    };
  },
  methods: {
    verify() {
      const body = {
        userId: this.$route.params.id,
        secretCode: this.secretCode
      };

      apiClient
        .verify(body)
        .then(response => console.log({ response }))
        .catch(error => console.log({ error }));
    }
  }
};
</script>

<style>
</style>