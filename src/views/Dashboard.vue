<template>
    <div class="main">
        <div class="main__cabecera">
            <head-bar></head-bar>
        </div>
        <div class="main__contenido">
            <router-view/>
        </div>
        <div class="main__pie">
            <foot-bar></foot-bar>
        </div>
    </div>
</template>

<script>
import HeadBar from '../components/HeadBar.vue';
import FootBar from '../components/FootBar.vue';
    export default {
        components:{
            HeadBar,
            FootBar
        }
    }
</script>

<style lang="scss" scoped>
     .main{
        
      //  height: 300px;
        //  &__cabecera{
        //  }
         &__contenido{
             height: 50vh;
             background-color: #EEEEEE;
         }
        //  &__pie{
        //  }
     }
</style>