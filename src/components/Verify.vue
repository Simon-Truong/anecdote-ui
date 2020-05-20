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
                    <v-text-field
                      dense
                      label="Enter your code here"
                      v-on:keyup.enter="verify"
                      v-model="secretCode"
                    ></v-text-field>
                    <a class="custom-anchor" @click.prevent="resendCode">Resend Code</a>
                    <span v-if="showSpinner" class="ml-2">
                      <v-progress-circular color="#757575" indeterminate size="20"></v-progress-circular>
                    </span>
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
import { userService } from '../service/apiClient';
import responseHandlerMixins from '../mixins/response-handler.mixins';

export default {
  name: 'Verify',
  mixins: [responseHandlerMixins],
  data() {
    return {
      secretCode: '',
      showSpinner: false,
      userId: this.$route.params.id
    };
  },
  methods: {
    verify() {
      const body = {
        userId: this.userId,
        secretCode: this.secretCode
      };

      userService
        .verify(body)
        .then(response => {
          this.processSuccessResponse(response.data);
          this.$router.push('/login');
        })
        .catch(error => this.processErrorResponse(error.response));
    },
    resendCode() {
      const body = {
        userId: this.userId
      };

      this.showSpinner = true;

      userService
        .resendCode(body)
        .then(response => this.processSuccessResponse(response.data))
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
    }
  }
};
</script>

<style>
</style>