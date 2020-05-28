<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" />

        <v-col cols="6">
          <v-form v-model="isFormValid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="4" />

                <v-col cols="4">
                  <v-text-field
                    dense
                    label="Email"
                    v-model="email"
                    :rules="[rules.required]"
                    @keydown.enter="submit"
                  ></v-text-field>
                </v-col>

                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="pt-0">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="Password"
                    v-model="password"
                    :type="showPassword ? 'text': 'password'"
                    :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                    counter
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required]"
                    @keydown.enter="submit"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="d-flex justify-space-between py-0">
                  <a @click.prevent="requestResetPassword" class="custom-anchor">Forgot password?</a>
                </v-col>

                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="d-flex justify-space-between pt-0">
                  <div>
                    <router-link to="/" class="custom-anchor no-decoration">Don't have an account?</router-link>
                  </div>
                </v-col>

                <v-col cols="4" />
              </v-row>

              <v-row>
                <v-col cols="4" />

                <v-col cols="4" class="d-flex justify-space-between pt-0">
                  <div>
                    <v-btn
                      tile
                      depressed
                      small
                      dark
                      color="#1976d2"
                      :disabled="!isFormValid"
                      @click="submit"
                    >Login</v-btn>
                    <span v-if="showSpinner" class="ml-2">
                      <v-progress-circular color="#757575" indeterminate size="20"></v-progress-circular>
                    </span>
                  </div>
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
import { userService } from '../service/apiClient';
import authService   from '../service/authClient';
import responseHandlerMixins from '../mixins/response-handler.mixins';

export default {
  name: 'Login',
  mixins: [responseHandlerMixins],
  data() {
    return {
      // form
      isFormValid: false,
      showPassword: false,
      showSpinner: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required'
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const body = {
        email: this.email,
        password: this.password
      };

      authService
        .logIn(body)
        .then(response => {
          this.updateStore(response);

          this.$store.dispatch('refreshToken', response.data.accessTokenExpInMins);

          this.$router.push('/browse');
        })
        .catch(error => {
          if (error.response.status === 401) {
            const userResponse = confirm(error.response.data);

            if (userResponse) {
              this.resendCode();
            }
          }

          this.processErrorResponse(error.response);
        });
    },
    updateStore(response) {
      const { accessToken, user } = response.data;

      this.$store.commit('setAccessToken', accessToken);
      this.$store.commit('login');
      this.$store.commit('setUser', user);
    },
    resendCode() {
      this.showSpinner = true;

      userService
        .resendCode({ email: this.email })
        .then(response => this.processSuccessResponse(response.data))
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
    },
    requestResetPassword() {
      const email = prompt('Enter your email:');

      if (!email) {
        return;
      }

      this.showSpinner = true;

      userService
        .requestResetPassword({ email })
        .then(response => this.processSuccessResponse(response.data))
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
    }
  }
};
</script>

<style scoped lang="scss">
</style>