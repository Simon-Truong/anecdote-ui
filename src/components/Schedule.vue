<template>
  <div>
    <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
    </v-row>
  </div>
</template>

<script>
export default {
    name: 'Schedule',
    data() {
        return {
            picker: new Date().toISOString().substr(0, 10)
        }
    }
}
</script>

<style scoped lang="scss">

</style>