<template>
  <div class="vh-100">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card tile flat>
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
              > {{ initials }}</v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-date-picker color="primary" v-model="picker" no-title :events="events"></v-date-picker>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
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

<style scoped lang="scss">
.vh-100 {
  height: 100%;
}
</style>