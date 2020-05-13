<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-card class="mb-4" tile flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline">USER</div>
                <v-list-item-title class="headline mb-1">{{ fullName }}</v-list-item-title>
                <v-list-item-subtitle>{{ tags }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                class="white--text"
                tile
                size="60"
                :color="getRandomAvatarColour()"
              >{{ initials }}</v-list-item-avatar>
            </v-list-item>
          </v-card>

          <v-date-picker color="primary" v-model="picker" no-title :events="events" flat></v-date-picker>
        </v-col>

        <v-col cols="10">
          <v-sheet height="400">
            <v-calendar
              ref="calendar"
              :now="selectedDate"
              :value="selectedDate"
              :events="events"
              color="primary"
              type="week"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import apiClient from '../service/user.service';
import { capitalCase } from 'capital-case';
import defaultAvatarColours from '../shared/avatar-default-colours';

export default {
  name: 'Schedule',
  data() {
    return {
      // date picker
      picker: new Date().toISOString().substr(0, 10),
      // events: [new Date().toISOString().substring(0, 10)], // TODO
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedUserId: this.$route.params.id,
      selectedUser: null
    };
  },
  methods: {
    getUser() {
      apiClient
        .getUserById(this.selectedUserId)
        .then(response => (this.selectedUser = response.data))
        .catch(error => console.log({ error }));
    },
    getRandomAvatarColour() {
      const randomIndex = Math.floor(Math.random() * 10);
      return defaultAvatarColours[randomIndex];
    }
  },
  computed: {
    fullName() {
      return this.selectedUser ? capitalCase(`${this.selectedUser.first_name} ${this.selectedUser.surname}`) : '';
    },
    tags() {
      return this.selectedUser ? this.selectedUser.tags.join(', ') : '';
    },
    initials() {
      return this.selectedUser ? capitalCase(`${this.selectedUser.first_name[0]} ${this.selectedUser.surname[0]}`) : '';
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style lang="scss">

</style>