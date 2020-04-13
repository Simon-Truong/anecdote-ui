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
            <template v-slot:item._fullName="{ item }">
              <router-link to="/profile" class="custom-anchor font-weight-bold">{{ item._fullName }}</router-link>
            </template>
            <!-- //TODO: profile -->

            <template v-slot:item._tags="{ item }">
              <span class="custom-table-data">{{ item._tags }}</span>
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
const axios = require('axios');

export default {
  name: 'Root',
  data() {
    return {
      headers: [
        // TODO: avatars
        {
          text: 'Full Name',
          value: '_fullName',
          sortable: false, // TODO: sorting
          width: '20%'
        },
        {
          text: 'Tags',
          value: '_tags',
          sortable: false, // TODO: sorting
          width: '50%'
        },
        {
          value: 'actions',
          sortable: false,
          width: '30%'
        }
      ],
      items: []
    };
  },
  methods: {
    getUsers() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/users`)
        .then(response => {
          const users = response.data;
          this.items = users.map(user => {
            user._fullName = `${user.first_name} ${user.surname}`;
            user._tags = user.tags.join(', ');
            return user;
          });
        })
        .catch(error => console.log({ error }));
    }
  },
  created() {
    this.getUsers();
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