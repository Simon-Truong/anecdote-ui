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
          ></v-data-table>
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SAMPLE_DATA from '../_/_sample-data';

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
        width: '60%'
      },
      {
        // placeholder for "schedule" and "message" buttons
        sortable: false,
        width: '20%'
      }
    ],
    items: SAMPLE_DATA
  })
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

      tbody {
        tr {
          td {
            color: $grey-darken-1;

            &:nth-child(1) {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>