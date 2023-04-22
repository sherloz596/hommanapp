<template>
    <div>
        <v-app-bar
          class="headbar"
          color="#810281"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>HommanApp</v-toolbar-title>
    
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .headbar{
        color: #EEEEEE;
    }
</style>