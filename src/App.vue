<template>
  <v-app class="app">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style lang="scss" scoped>
  .app{
    background-color: #810281;
    //padding: 30px;
  }
</style>