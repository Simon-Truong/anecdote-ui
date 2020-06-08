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
            ref="picker"
            color="primary"
            v-model="datePicker"
            no-title
            :events="events"
            @change="syncCalendarPicker"
            :picker-date.sync="monthYear"
          ></v-date-picker>
          <div class="mt-2 d-flex justify-end">
            <v-btn tile depressed small dark @click="resetDates" color="#1976d2">Today</v-btn>
          </div>
        </v-col>

        <v-col cols="9">
          <VueCal
            class="white-title"
            ref="vuecal"
            style="height: 100%;"
            hide-view-selector
            active-view="week"
            :startWeekOnSunday="true"
            :time-from="8 * 60"
            :time-to="22 * 60"
            :disable-views="['years', 'year', 'month', 'day']"
            :events="calendarEvents"
            :cell-click-hold="false"
            :selected-date="calendarPicker"
            @ready="setCalendarRange($event)"
            @cell-click="onCellClick($event)"
            @view-change="setCalendarRange($event)"
          ></VueCal>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showDialog" width="700">
      <v-card height="900">
        <v-card-title>
          <div>Session with {{ fullName }}</div>
          <div class="ml-auto">
            <em>{{ datePicker }}</em>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="isFormValid">
              <v-row>
                <v-col cols="1" class="d-flex align-center">
                  <strong>From:</strong>
                </v-col>

                <v-col cols="3">
                  <vue-timepicker
                    class="input"
                    v-model="timePickerFrom"
                    format="HH:mm"
                    hide-clear-button
                    close-on-complete
                    :hour-range="[[8, 21]]"
                    hide-disabled-items
                  ></vue-timepicker>
                </v-col>

                <v-col cols="1" class="d-flex align-center">
                  <strong>To:</strong>
                </v-col>

                <v-col cols="3">
                  <vue-timepicker
                    class="input"
                    v-model="timePickerTo"
                    format="HH:mm"
                    hide-clear-button
                    close-on-complete
                    :hour-range="[[9, 22]]"
                    hide-disabled-items
                  ></vue-timepicker>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div id="app">
                    <google-map @placeSelected="onPlaceSelect" />
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="comments"
                    label="Comments"
                    counter="255"
                    flat
                    outlined
                    :rules="[rules.maxCommentLength]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-btn
                    tile
                    depressed
                    small
                    dark
                    color="#1976d2"
                    @click="submitSchedule"
                    :disabled="isButtonDisabled"
                  >Schedule</v-btn>
                  <span v-if="showSpinner" class="ml-2">
                    <v-progress-circular color="#757575" indeterminate size="20"></v-progress-circular>
                  </span>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { userService, scheduleService } from '../service/apiClient';
import { capitalCase } from 'capital-case';
import VueCal from 'vue-cal';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import defaultAvatarColours from '../shared/avatar-default-colours';
import GoogleMap from './GoogleMap';
import moment from 'moment';
import rulesMixins from '../mixins/rules.mixins';
import responseHandlerMixins from '../mixins/response-handler.mixins';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal, VueTimepicker, GoogleMap },
  name: 'Schedule',
  mixins: [rulesMixins, responseHandlerMixins],
  data() {
    return {
      isFormValid: true,
      // date picker
      datePicker: new Date().toISOString().substr(0, 10), // format: "2020-06-03"
      monthYear: null, // on month change
      events: [],
      // calendar picker
      calendarPicker: new Date(),
      calendarEvents: [],
      calendarRange: null,
      // schedule
      timePickerFrom: '', // format: HH:mm
      timePickerTo: '', // format: HH:mm
      selectedPlaceLat: null,
      selectedPlaceLng: null,
      scheduleComments: '',
      showDialog: false,
      comments: '',
      //
      showSpinner: false,
      selectedUserId: this.$route.params.id,
      selectedUser: null
    };
  },
  methods: {
    getUser() {
      userService
        .getUserById(this.selectedUserId)
        .then(response => (this.selectedUser = response.data))
        .catch(error => console.log({ error }));
    },
    getSchedules() {
      if (!this.monthYear) {
        return;
      }

      scheduleService
        .getSchedules(this.monthYear, this.selectedUserId)
        .then(({ data }) => (this.events = data))
        .catch(error => console.log({ error }));
    },
    getRandomAvatarColour() {
      const randomIndex = Math.floor(Math.random() * 10);
      return defaultAvatarColours[randomIndex];
    },
    onCellClick(dateObj) {
      if (Object.prototype.hasOwnProperty.call(dateObj, 'date')) {
        dateObj = dateObj.date;

        this.syncDatePicker(dateObj);
        return;
      }

      this.showScheduleDialog(dateObj);

      this.syncDatePicker(dateObj);
    },
    setCalendarRange(calendarRange) {
      this.calendarRange = calendarRange;
    },
    getDetailSchedules() {
      const dateFrom = moment.utc(this.calendarRange.startDate).format('YYYY-MM-DD');
      const dateTo = moment.utc(this.calendarRange.endDate).format('YYYY-MM-DD');

      scheduleService
        .getDetailSchedules(dateFrom, dateTo, this.selectedUserId)
        .then(({ data }) => (this.calendarEvents = data))
        .catch(error => this.processErrorResponse(error.response));
    },
    submitSchedule() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      this.showSpinner = true;

      const body = {
        userId: this.$store.getters.user.id,
        selectedUserId: this.selectedUserId,
        from: moment.utc(`${this.datePicker} ${this.timePickerFrom}`).format(),
        to: moment.utc(`${this.datePicker} ${this.timePickerTo}`).format(),
        lat: this.selectedPlaceLat,
        lng: this.selectedPlaceLng,
        comments: this.comments
      };

      scheduleService
        .saveSchedule(body)
        .then(({ data }) => {
          this.processSuccessResponse(data);

          this.showDialog = false;
          this.getSchedules();
          this.getDetailSchedules();
        })
        .catch(error => this.processErrorResponse(error.response))
        .finally(() => (this.showSpinner = false));
    },
    showScheduleDialog(dateObj) {
      const scheduleTimeFrom = new Date(dateObj.getTime());

      this.timePickerFrom = `${scheduleTimeFrom.getHours()}:00`;
      this.timePickerTo = `${scheduleTimeFrom.getHours() + 1}:00`;

      this.showDialog = true;
    },
    syncDatePicker(dateObj) {
      const tempDateObj = new Date(dateObj.getTime());

      tempDateObj.setHours(10);

      this.datePicker = tempDateObj.toISOString().substr(0, 10);
      this.monthYear = this.datePicker.substr(0, 7);
    },
    syncCalendarPicker(date) {
      this.calendarPicker = new Date(date.split('-'));
    },
    resetDates() {
      this.calendarPicker = new Date();

      const tempPicker = new Date();

      tempPicker.setHours(10);
      this.datePicker = tempPicker.toISOString().substr(0, 10);

      this.monthYear = this.datePicker.substr(0, 7);
    },
    onPlaceSelect({ lat, lng }) {
      this.selectedPlaceLat = lat;
      this.selectedPlaceLng = lng;
    }
  },
  computed: {
    fullName() {
      return this.selectedUser ? capitalCase(`${this.selectedUser.first_name} ${this.selectedUser.surname}`) : '';
    },
    tags() {
      return this.selectedUser ? this.selectedUser.tags.map(tag => capitalCase(tag)).join(', ') : '';
    },
    initials() {
      return this.selectedUser ? capitalCase(`${this.selectedUser.first_name[0]} ${this.selectedUser.surname[0]}`) : '';
    },
    isButtonDisabled() {
      return !this.isFormValid || !this.selectedPlaceLat || !this.selectedPlaceLng;
    }
  },
  watch: {
    monthYear() {
      this.getSchedules();
    },
    calendarRange() {
      this.getDetailSchedules();
    }
  },
  created() {
    this.getUser();
    this.getSchedules();
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

::v-deep .vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
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