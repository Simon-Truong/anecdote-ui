<template>
  <div>
    <v-container>
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
                @keyup.enter="search"
                v-model="searchQuery"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="3" v-if="!isAuthenticated">
          <fieldset>
            <legend>
              <em>Sign up</em>
            </legend>
            <v-form v-model="isFormValid" ref="form">
              <v-container class="pt-0">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      class="pt-0"
                      label="First Name"
                      v-model="firstName"
                      :rules="[rules.required]"
                      @keyup.enter="submit"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      dense
                      class="pt-0"
                      label="Surname"
                      v-model="surname"
                      :rules="[rules.required]"
                      @keyup.enter="submit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="pt-0">
                    <v-text-field
                      dense
                      class="pt-0"
                      label="Email"
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      @keyup.enter="submit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="pt-0">
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
                      @keyup.enter="submit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="pt-0">
                    <v-text-field
                      dense
                      class="pt-0"
                      label="Confirm Password"
                      v-model="confirmPassword"
                      counter
                      :rules="[rules.required, rules.confirmPassword]"
                      type="password"
                      @keyup.enter="submit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="py-0">
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
                  <v-col cols="12" class="d-flex justify-start">
                    <v-btn
                      tile
                      depressed
                      small
                      dark
                      :disabled="!isFormValid"
                      @click="submit"
                      color="#1976d2"
                    >Sign up</v-btn>
                    <span v-if="showSpinner" class="d-flex align-center ml-2">
                      <v-progress-circular color="#757575" indeterminate size="20"></v-progress-circular>
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </fieldset>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { userService } from '../service/apiClient';
import rulesMixins from '../mixins/rules.mixins';
import responseHandlerMixins from '../mixins/response-handler.mixins';

export default {
  name: 'Home',
  mixins: [rulesMixins, responseHandlerMixins],
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
      confirmPassword: '',
      items: ['Chef', 'Doctor', 'Rock Climbing'],
      tags: [],
      searchInput: ''
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
        confirmPassword: this.confirmPassword,
        tags: this.tags
      };

      this.showSpinner = true;

      userService
        .signUp(newUser)
        .then(response => {
          this.processSuccessResponse(response.data);
          this.$router.push('/login');
        })
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
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
@import '@/styles/_variables.scss';

fieldset {
  border-color: $background-color;
}
</style>