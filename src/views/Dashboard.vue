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
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Despensas'
                    }else{
                        this.titulo = 'Pantries'
                    }
                }
                if(this.$route.path === "/dashboard/compra"){
                    this.seleccionado = "compra"
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Lista de la compra'
                    }else{
                        this.titulo = 'Shopping list'
                    }
                }
                if(this.$route.path === "/dashboard/favoritos"){
                    this.seleccionado = "favoritos"
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Favoritos'
                    }else{
                        this.titulo = 'Favorites'
                    }
                }
                if(this.$route.path === "/dashboard/productos"){
                    this.seleccionado = "productos"
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Lista de productos'
                    }else{
                        this.titulo = 'Products list'
                    }
                }
                if(this.$route.path === "/dashboard/unidades"){
                    this.seleccionado = ""
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Lista de unidades'
                    }else{
                        this.titulo = 'Units list'
                    }
                }
                if(this.$route.path === "/dashboard/invitar"){
                    this.seleccionado = ""
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Invitar usuarios'
                    }else{
                        this.titulo = 'Invite users'
                    }
                    
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