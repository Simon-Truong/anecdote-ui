<template>
  <div class="vh-100">
    <v-row>
      <v-col>
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
  </div>
</template>

<script>
import apiClient from '../service/user.service';

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
        .then(response => (this.selectedUser = response))
        .catch(error => console.log({ error }));
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