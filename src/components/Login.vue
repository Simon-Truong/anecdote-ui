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

                <v-col cols="4" class="d-flex justify-space-between">
                  <router-link to="/" class="custom-anchor caption">Don't have an account? Sign up</router-link>

                  <v-btn
                    tile
                    depressed
                    small
                    dark
                    color="#1976d2"
                    :disabled="!isFormValid"
                    @click="submit"
                  >Login</v-btn>
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
import apiClient from '../service/user.service';

export default {
  name: 'Login',
  data() {
    return {
      isFormValid: false,
      showPassword: false,
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

      apiClient
        .logIn(body)
        .then(response => {
          const { data } = response;
          localStorage.setItem('accessToken', data.token);

          this.$store.commit('login');
          this.$router.push('/browse');
        })
        .catch(error => console.log({ error }));
    }
  }
};
</script>

<style>
</style>