<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-data-table
            class="custom-headers"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="items"
            :footer-props="{
              'items-per-page-options': [5, 10, 15]
              }"
          >
            <template v-slot:item.fullName="{ item }">
              <router-link to="/profile" class="custom-anchor font-weight-bold">{{ item.fullName }}</router-link>
            </template>
            <!-- //TODO: profile -->

            <template v-slot:item.tags="{ item }">
              <span class="custom-table-data">{{ item.tags }}</span>
            </template>

            <template v-slot:item.actions>
              <div class="d-flex justify-center">
                <v-btn tile depressed small dark color="#1976d2" class="mr-2">Schedule</v-btn>
                <!-- //TODO: schedule -->
                <v-btn tile depressed small dark color="#1976d2">Message</v-btn>
                <!-- //TODO: message -->
              </div>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SAMPLE_DATA from '../_/_sample-data';

const axios = require('axios');

export default {
  name: 'Root',
  data: () => ({
    headers: [
      // TODO: avatars
      {
        text: 'Full Name',
        value: 'fullName',
        sortable: false, // TODO: sorting
        width: '20%'
      },
      {
        text: 'Tags',
        value: 'tags',
        sortable: false, // TODO: sorting
        width: '50%'
      },
      {
        value: 'actions',
        sortable: false,
        width: '30%'
      }
    ],
    items: SAMPLE_DATA // TODO: use API
  }),
  created: () => {
    axios
      .get(`${process.env.VUE_APP_API_URL}/users`)
      .then(response => console.log(response.data))
      .catch(error => console.log({ error }));
  }
};
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.v-data-table.custom-headers.theme--light {
  .v-data-table__wrapper {
    table {
      thead {
        tr {
          th {
            color: $grey-darken-4;
          }
        }
      }
    }
  }
}

.custom-table-data {
  color: $grey-darken-1;
}
</style>