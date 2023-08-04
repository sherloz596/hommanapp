<template>
    <div>
        <v-bottom-navigation
        class="pie"
      >
      <v-row no-gutters>
        <v-col  cols="1" xs="1" lg="1"/>
        <v-col  cols="2" xs="2" lg="2" :style="estilo_desp">
      <!-- <v-sheet class="ma-2 pa-2">
            One of three columns
          </v-sheet> -->
        
        <v-btn class="seleccionado"
        v-if="seleccionado === 'despensas'"
        @click="despensas">
        <font-awesome-icon icon="fa-solid fa-door-closed" size="xl" />  
          <span v-if="idioma==='SPA'">Despensas</span>
          <span v-else>Pastries</span>
        </v-btn>
<!-- CAMBIOS RESPONSIVE -->
        <v-btn v-else
        @click="despensas"
        style="width: 100%;">
        <font-awesome-icon icon="fa-solid fa-door-closed" size="xl"/>  
          <!-- <span>Video</span> -->
        </v-btn>
    </v-col>
    <v-col cols="2" xs="2" lg="2" :style="estilo_comp">
        <v-btn class="seleccionado"
        v-if="seleccionado === 'compra'"
        @click="compra">
        <font-awesome-icon icon="fa-solid fa-basket-shopping" size="xl" />
          <span v-if="idioma==='SPA'">Lista compra</span>
          <span v-else>Shopping list</span>
        </v-btn>

        <v-btn v-else
        @click="compra"
        style="width: 100%;">
        <font-awesome-icon icon="fa-solid fa-basket-shopping" size="xl" />
          </v-btn>
        </v-col>
        <v-col cols="2" xs="2" lg="2" :style="estilo_fav">
        <v-btn class="seleccionado"
        v-if="seleccionado === 'favoritos'"
        @click="favoritos">
        <font-awesome-icon icon="fa-solid fa-star" size="xl" />
  
          <span v-if="idioma==='SPA'">Favoritos</span>
          <span v-else>Favorites</span>
        </v-btn>

        <v-btn v-else @click="favoritos"
        style="width: 100%;">
            <font-awesome-icon icon="fa-solid fa-star" size="xl" />
          </v-btn>
        </v-col>
        <v-col cols="2" xs="2" lg="2" :style="estilo_prod">
        <v-btn class="seleccionado" v-if="seleccionado === 'productos'"
        @click="productos">
            <font-awesome-icon  icon="fa-solid fa-jar" size = "xl" />
  
          <span v-if="idioma==='SPA'">Productos</span>
          <span v-else>Products</span>
        </v-btn>
        <v-btn v-else  @click="productos"
        style="width: 100%;">
            <font-awesome-icon  icon="fa-solid fa-jar" size = "xl"/>
          </v-btn>
        </v-col>
        

        <v-col cols="2" xs="2" lg="2" :style="estilo_tar">
        <v-btn class="seleccionado" v-if="seleccionado === 'tareas'"
        @click="tareas">
            <font-awesome-icon  icon="fa-solid fa-list-check" size = "xl" />
  
          <span v-if="idioma==='SPA'">Tareas</span>
          <span v-else>Tasks</span>
        </v-btn>
        <v-btn v-else  @click="tareas"
        style="width: 100%;">
            <font-awesome-icon  icon="fa-solid fa-list-check" size = "xl"/>
          </v-btn>
        </v-col>
        <v-col  cols="1" xs="1" lg="1"/>
        </v-row>
      </v-bottom-navigation>
        <!-- <footer class="pie">
            <div class="foot_btn">
                <span>
                    <v-btn variant="text" icon="mdi-door"></v-btn>
                </span>
                <span>
                    <v-btn variant="text" icon="mdi-cart"></v-btn>
                </span>
                <span>
                    <v-btn variant="text" icon="mdi-star"></v-btn>
                </span>
                <span>
                    <v-btn variant="text" icon="mdi-star"></v-btn>
                </span>
            </div>
        </footer> -->
    </div>
</template>

<script>
    export default {
        data: function() {
            return{
                 idioma: "",
                 //estilo: "background-color: red;text-align: center;"
                //value: 1 
            }
        },
        props:{
            seleccionado: '',
            estilo_desp: '',
            estilo_comp: '',
            estilo_fav: '',
            estilo_prod: '',
            estilo_tar:''
        },
        methods:{
            despensas(){
                //this.seleccionado = 'despensas'
                this.$router.push('despensas')
            },
            compra(){
                //this.seleccionado = 'compra'
                this.$router.push('compra')
            },
            favoritos(){
                //this.seleccionado = 'favoritos'
                this.$router.push('favoritos')
            },
            productos(){
                //this.seleccionado = 'preferencias'
                this.$router.push('productos')
            },
            tareas(){
                this.$router.push('tareas')
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
        }
        // mounted() {
        //     console.log(this.$route.path)
        //     switch(this.$route.path){
        //         case "/dashboard/despensas":
        //             this.seleccionado = this.despensas
        //             break
        //         case "/dashboard/compra":
        //             this.seleccionado = this.compra
        //             break
        //         case "/dashboard/favoritos":
        //             this.seleccionado = this.favoritos
        //             break
        //         case "/dashboard/preferencias":
        //             this.seleccionado = this.preferencias
        //             break
        //     }
        // },
       // data: () => ({ value: 1 }),
       /* computed: {
    bgcolor () {
      switch (this.value) {
        case 0: return 'blue-grey'
        case 1: return '810281'
        case 2: return 'brown'
        case 3: return 'indigo'
        default: return 'blue-grey'
      }
    },
    color(){
        
    }
  },*/
    }
</script>

<style lang="scss" scoped>
    .pie{
        color: #EEEEEE;
        background-color: #810281;
    }
    .seleccionado{
        color: #810281;
        background-color: #EEEEEE;
        width: 100%;
    }
</style>