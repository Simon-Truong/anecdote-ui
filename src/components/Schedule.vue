<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="mb-4" tile flat>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  <router-link
                    to="/profile"
                    class="custom-routerlink font-weight-bold"
                  >{{ fullName }}</router-link>
                </v-list-item-title>
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

          <v-date-picker
            class="d-flex justify-end"
            color="primary"
            v-model="picker"
            no-title
            :events="events"
            @change="selectPickerDate"
          ></v-date-picker>
          <div class="mt-2 d-flex justify-end">
            <v-btn tile depressed small dark @click="resetDates" color="#1976d2">Today</v-btn>
          </div>
        </v-col>

        <v-col cols="9">
          <VueCal
            class="white-title"
            ref="vuecal"
            style="height: 70%;"
            hide-view-selector
            active-view="week"
            :time-from="8 * 60"
            :time-to="22 * 60"
            :disable-views="['years', 'year', 'month', 'day']"
            :events="calendarEvents"
            :cell-click-hold="false"
            :selected-date="calendarSelectedDate"
            @cell-click="onCellClick($event)"
          ></VueCal>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showDialog" width="700">
      <v-card height="900">
        <v-card-title>
          <div>Session with {{ fullName }}</div>
          <div class="ml-auto">
            <em>{{ picker }}</em>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="1" class="d-flex align-center">
                <strong>From:</strong>
              </v-col>

              <v-col cols="3">
                <vue-timepicker class="input" v-model="timePickerFrom" format="HH:mm" hide-clear-button close-on-complete :hour-range="[[8, 21]]" hide-disabled-items></vue-timepicker>
              </v-col>

              <v-col cols="1" class="d-flex align-center">
                <strong>To:</strong>
              </v-col>

              <v-col cols="3">
                <vue-timepicker class="input" v-model="timePickerTo" format="HH:mm" hide-clear-button close-on-complete :hour-range="[[9, 22]]" hide-disabled-items></vue-timepicker>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div id="app">
                  <google-map />
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea v-model="comments" label="Comments" counter="255" flat outlined></v-textarea>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-end">
              <v-btn tile depressed small dark color="#1976d2">Schedule</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiClient from '../service/user.service';
import { capitalCase } from 'capital-case';
import defaultAvatarColours from '../shared/avatar-default-colours';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import GoogleMap from './GoogleMap';

export default {
  components: { VueCal, VueTimepicker, GoogleMap },
  name: 'Schedule',
  data() {
    return {
      // date picker
      picker: new Date().toISOString().substr(0, 10),
      events: ['2020-05-15'],
      // calendar
      calendarSelectedDate: new Date(),
      calendarEvents: [
        {
          start: '2020-05-15 10:00',
          end: '2020-05-15 11:00',
          // You can also define event dates with Javascript Date objects:
          // start: new Date(2018, 11 - 1, 16, 10, 30),
          // end: new Date(2018, 11 - 1, 16, 11, 30),
          title: 'Session with Andrew',
          content: '',
          class: 'health'
        }
      ],
      // schedule
      timePickerFrom: '',
      timePickerTo: '',
      scheduleLocation: '',
      scheduleComments: '',
      showDialog: false,
      comments: '',
      //
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
    },
    selectPickerDate(date) {
      this.calendarSelectedDate = new Date(date.split('-'));
    },
    onCellClick(dateObj) {
      if (Object.prototype.hasOwnProperty.call(dateObj, 'date')) {
        dateObj = dateObj.date;

        this.syncPicker(dateObj);
        return;
      }

      this.showScheduleDialog(dateObj);

      this.syncPicker(dateObj);
    },
    showScheduleDialog(dateObj) {
      const scheduleTimeFrom = new Date(dateObj.getTime());

      this.timePickerFrom = `${scheduleTimeFrom.getHours()}:00`;
      this.timePickerTo = `${scheduleTimeFrom.getHours() + 1}:00`;

      this.showDialog = true;
    },
    syncPicker(dateObj) {
      const tempDateObj = new Date(dateObj.getTime());

      tempDateObj.setHours(10);

      this.picker = tempDateObj.toISOString().substr(0, 10);
    },
    resetDates() {
      this.calendarSelectedDate = new Date();

      const tempPicker = new Date();

      tempPicker.setHours(10);
      this.picker = tempPicker.toISOString().substr(0, 10);
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
    this.$refs.calendar ? this.$refs.calendar.scrollToTime('08:00') : null;
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.v-picker.v-card {
  box-shadow: none;
  border-radius: 0;
}

::v-deep .v-calendar-daily_head-day-label .v-btn--fab.v-size--default {
  height: 2rem;
  width: 2rem;
}

.vuecal,
::v-deep .vuecal__title-bar {
  background-color: white;

  .vuecal__title > span {
    background-color: inherit;

    &:hover {
      cursor: initial;
    }
  }
}

::v-deep .vuecal__flex.vuecal__cells.week-view {
  .vuecal__cell:hover {
    cursor: pointer;
  }
}

::v-deep .v-textarea {
  border-radius: 0;
}

::v-deep .vue__time-picker .dropdown ul li:not([disabled]).active, .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: $primary;
}

.input {
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textfield;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 0px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  border-image: initial;
}

::v-deep .vue__time-picker input.display-time {
  border: none;
}
</style>