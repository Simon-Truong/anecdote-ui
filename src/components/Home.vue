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
                validate-on-blur
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
                  <v-text-field
                    dense
                    class="pt-0"
                    label="First Name"
                    v-model="firstName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="Surname"
                    v-model="surname"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="Email"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pt-0">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="Password"
                    v-model="password"
                    :type="showPassword ? 'text': 'password'"
                    :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                    counter
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required, rules.minimumLength, rules.password]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="d-flex justify-end">
                  <v-btn tile depressed small dark @click="submit()" color="#1976d2">Sign up</v-btn>
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
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      showPassword: false,
      firstName: '',
      surname: '',
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        minimumLength: value => value.length >= 8 || 'Password must be at least 8 characters long.',
        password: value => {
          const upperCasePattern = /[A-Z]/;
          const lowerCasePattern = /[a-z]/;
          const numberPattern = /[0-9]/;
          const specialCharacterPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

          if (!upperCasePattern.test(value)) {
            return 'Password must contain one uppercase word.';
          }

          if (!lowerCasePattern.test(value)) {
            return 'Password must contain one lowercase word.';
          }

          if (!numberPattern.test(value)) {
            return 'Password must contain one number.';
          }

          if (!specialCharacterPattern.test(value)) {
            return 'Password must contain one special character.';
          }

          if (value.includes(this.firstName) || value.includes(this.surname) || value.includes(this.email)) {
            return 'Password must not contain first name, surname or email.';
          }

          return true;
        }
      }
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
    },
    submit() {
      const newUser = {
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        password: this.password,
        joined: moment().format()
      };

      axios
        .post(`${process.env.VUE_APP_API_URL}/user`, newUser)
        .then(response => console.log({ response }))
        .catch(error => console.log({ error }));
    }
  }
};
</script>

<style scoped lang="scss">
</style>