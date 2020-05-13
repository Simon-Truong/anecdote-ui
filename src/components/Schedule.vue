<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-card class="mb-4" tile flat>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ fullName }}</v-list-item-title>
                <v-list-item-subtitle>{{ tags }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                class="white--text"
                tile
                size="40"
                :color="getRandomAvatarColour()"
              >{{ initials }}</v-list-item-avatar>
            </v-list-item>
          </v-card>

          <v-date-picker color="primary" v-model="picker" no-title :events="events"></v-date-picker>
        </v-col>

        <v-col cols="10">
          <v-sheet height="400">
            <v-calendar class="test"
              ref="calendar"
              :value="picker"
              :now="picker"
              :events="calendarEvents"
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
      events: [new Date().toISOString().substring(0, 10)],
      calendarEvents: [
        {
          name: 'Weekly Meeting',
          start: '2020-05-14 09:00',
          end: '2020-05-14 10:00'
        }
      ],
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
  },
  mounted() {
    this.$refs.calendar.scrollToTime('08:00');
  }
};
</script>

<style scoped lang="scss">
.v-picker.v-card {
  box-shadow: none;
  border-radius: 0;
}

::v-deep .v-calendar-daily_head-day-label .v-btn--fab.v-size--default {
  height: 2rem;
  width: 2rem;
}
</style>