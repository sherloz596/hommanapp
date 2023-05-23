<template>
    <div class="main">
        <div class="main__cabecera">
            <head-bar :titulo="titulo"></head-bar>
        </div>
        <div class="main__contenido">
            <router-view/>
        </div>
        <div class="main__pie">
            <foot-bar 
            :seleccionado="seleccionado"
            :estilo_desp="estilo_desp"
            :estilo_comp="estilo_comp"
            :estilo_fav="estilo_fav"
            :estilo_prod="estilo_prod"
            ></foot-bar>
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
                titulo: '',
                estilo_desp: '',
                estilo_comp: '',
                estilo_fav: '',
                estilo_prod: ''
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
                    this.estilo_desp = "background-color: #EEEEEE;text-align: center;"
                    this.estilo_comp = "background-color: #810281;text-align: center;"
                    this.estilo_fav = "background-color: #810281;text-align: center;"
                    this.estilo_prod = "background-color: #810281;text-align: center;"

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
                    this.estilo_desp = "background-color: #810281;text-align: center;"
                    this.estilo_comp = "background-color: #EEEEEE;text-align: center;"
                    this.estilo_fav = "background-color: #810281;text-align: center;"
                    this.estilo_prod = "background-color: #810281;text-align: center;"
                }
                if(this.$route.path === "/dashboard/favoritos"){
                    this.seleccionado = "favoritos"
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Favoritos'
                    }else{
                        this.titulo = 'Favorites'
                    }
                    this.estilo_desp = "background-color: #810281;text-align: center;"
                    this.estilo_comp = "background-color: #810281;text-align: center;"
                    this.estilo_fav = "background-color: #EEEEEE;text-align: center;"
                    this.estilo_prod = "background-color: #810281;text-align: center;"
                }
                if(this.$route.path === "/dashboard/productos"){
                    this.seleccionado = "productos"
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Lista de productos'
                    }else{
                        this.titulo = 'Products list'
                    }
                    this.estilo_desp = "background-color: #810281;text-align: center;"
                    this.estilo_comp = "background-color: #810281;text-align: center;"
                    this.estilo_fav = "background-color: #810281;text-align: center;"
                    this.estilo_prod = "background-color: #EEEEEE;text-align: center;"
                }
                if(this.$route.path === "/dashboard/unidades"){
                    this.seleccionado = ""
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Lista de unidades'
                    }else{
                        this.titulo = 'Units list'
                    }
                    this.estilo_desp = "background-color: #810281;text-align: center;"
                    this.estilo_comp = "background-color: #810281;text-align: center;"
                    this.estilo_fav = "background-color: #810281;text-align: center;"
                    this.estilo_prod = "background-color: #810281;text-align: center;"
                }
                if(this.$route.path === "/dashboard/invitar"){
                    this.seleccionado = ""
                    if (localStorage.getItem('idioma')=== "SPA"){
                        this.titulo = 'Invitar usuarios'
                    }else{
                        this.titulo = 'Invite users'
                    }
                    this.estilo_desp = "background-color: #810281;text-align: center;"
                    this.estilo_comp = "background-color: #810281;text-align: center;"
                    this.estilo_fav = "background-color: #810281;text-align: center;"
                    this.estilo_prod = "background-color: #810281;text-align: center;"
                    
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