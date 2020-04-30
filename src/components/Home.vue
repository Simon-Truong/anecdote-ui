<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" />

        <v-col cols="6">
          <h2 class="pl-3" v-if="!isAuthenticated">sign up</h2>
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
                hint="Search people, tags..."
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
          <v-form v-if="!isAuthenticated" v-model="isFormValid" ref="form">
            <v-container class="pt-0">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="First Name"
                    v-model="firstName"
                    :rules="[rules.required]"
                    @keydown.enter="submit"
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    dense
                    class="pt-0"
                    label="Surname"
                    v-model="surname"
                    :rules="[rules.required]"
                    @keydown.enter="submit"
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
                    @keydown.enter="submit"
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
                    @keydown.enter="submit"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="py-0">
                  <v-combobox
                    class="pt-0"
                    dense
                    label="Tags"
                    outlined
                    multiple
                    hide-selected
                    :items="items"
                    v-model="tags"
                    :search-input.sync="searchInput"
                    hint="Describe yourself"
                    persistent-hint
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            No results matching "
                            <strong>{{ searchInput }}</strong>". Press
                            <kbd>enter</kbd> to create a new one
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>

                    <template v-slot:selection="{ attrs, item, parent, selected }">
                      <v-chip v-bind="attrs" :input-value="selected" label small>
                        <span class="pr-2">{{ item }}</span>
                        <v-icon small @click="parent.selectItem(item)">fas fa-times</v-icon>
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="d-flex justify-end">
                  <span v-if="showSpinner" class="d-flex align-center mr-2">
                    <v-progress-circular color="#757575" indeterminate size="20"></v-progress-circular>
                  </span>
                  <v-btn
                    tile
                    depressed
                    small
                    dark
                    :disabled="!isFormValid"
                    @click="submit"
                    color="#1976d2"
                  >Sign up</v-btn>
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
import apiClient from '../service/user.service';

export default {
  name: 'Home',
  data() {
    return {
      isFormValid: false,
      searchQuery: '',
      showPassword: false,
      // form
      showSpinner: false,
      firstName: '',
      surname: '',
      email: '',
      password: '',
      items: ['Chef', 'Doctor', 'Rock Climbing'],
      tags: [],
      searchInput: '',
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
        path: 'browse',
        query: {
          q
        }
      };

      this.$router.push(routeOptions);
    },
    submit() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const newUser = {
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        password: this.password,
        tags: this.tags
      };

      this.showSpinner = true;

      apiClient
        .signUp(newUser)
        .then(response => alert(response.data))
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
    },
    processErrorResponse(response) {
      if (response.status === 500) {
        console.log(response.data);
        return;
      }

      if (response.status === 400) {
        alert(response.data);
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped lang="scss">
</style>