<template>
    <div class="main">
        <div class="main__cabecera">
            <head-bar :titulo="titulo"></head-bar>
        </div>
        <div class="main__contenido">
            <router-view/>
        </div>
        <div class="main__pie">
            <foot-bar :seleccionado="seleccionado"></foot-bar>
        </div>
    </div>
</template>

<script>
import HeadBar from '../components/HeadBar.vue';
import FootBar from '../components/FootBar.vue';
    export default {
        data(){
            return{
                seleccionado: '',
                titulo: ''
            }
        },
        components:{
            HeadBar,
            FootBar
        },
        methods:{
            upSeleccionado(){
                if(this.$route.path === "/dashboard/despensas"){
                    this.seleccionado = "despensas"
                    this.titulo = 'Despensas'
                }
                if(this.$route.path === "/dashboard/compra"){
                    this.seleccionado = "compra"
                    this.titulo = 'Lista de la compra'
                }
                if(this.$route.path === "/dashboard/favoritos"){
                    this.seleccionado = "favoritos"
                    this.titulo = 'Lista de favoritos'
                }
                if(this.$route.path === "/dashboard/productos"){
                    this.seleccionado = "productos"
                    this.titulo = 'Lista de productos'
                }
                if(this.$route.path === "/dashboard/unidades"){
                    this.seleccionado = ""
                    this.titulo = 'Lista de unidades'
                }
            }
        },
        mounted(){
            this.upSeleccionado()
        },
        updated(){
            this.upSeleccionado()
        }
    }
</script>

<style lang="scss" scoped>
     .main{
        
      //  height: 300px;
        //  &__cabecera{
        //  }
         &__contenido{
             height: 100vh;
             background-color: #EEEEEE;
         }
        //  &__pie{
        //  }
     }
</style>