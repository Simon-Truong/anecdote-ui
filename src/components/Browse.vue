<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-data-table
            class="custom-headers"
            :loading="isLoading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="items"
            :footer-props="{
              'items-per-page-options': [5, 10, 15]
              }"
          >
            <template v-slot:top>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="4" class="pb-0">
                    <v-text-field
                      class="custom-text-field"
                      append-icon="fa-search"
                      outlined
                      dense
                      @click:append="getUsers"
                      @keydown.enter="getUsers"
                      v-model="query"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:item._initials="{ item }">
              <v-avatar :color="getRandomAvatarColour()" size="30" tile>
                <span class="white--text">{{ item._initials }}</span>
              </v-avatar>
            </template>

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
import defaultAvatarColours from '../shared/avatar-default-colours';
import apiClient from '../service/user.service';

export default {
  name: 'Browse',
  data() {
    return {
      query: null,
      isLoading: true,
      // grid
      headers: [
        {
          value: '_initials',
          sortable: false,
          width: '10%'
        },
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
          width: '20%'
        }
      ],
      items: []
    };
  },
  methods: {
    getUsers() {
      apiClient
        .getUsers(this.query)
        .then(response => {
          const users = response.data;

          this.items = users.map(user => {
            user._fullName = `${user.first_name} ${user.surname}`;
            user._tags = user.tags.join(', ');
            user._initials = `${user.first_name[0]}${user.surname[0]}`;
            return user;
          });

          this.isLoading = false;
        })
        .catch(error => console.log({ error }));
    },
    getRandomAvatarColour() {
      const randomIndex = Math.floor(Math.random() * 10);
      return defaultAvatarColours[randomIndex];
    }
  },
  created() {
    this.query = this.$route.query.q;

    this.getUsers(this.query);
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