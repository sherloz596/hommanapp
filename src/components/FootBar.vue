<template>
    <div>
        <v-bottom-navigation
        class="pie"
      >
        <v-btn class="seleccionado"
        v-if="seleccionado === 'despensas'"
        @click="despensas">
        <font-awesome-icon icon="fa-solid fa-door-closed" size="xl" />  
          <span>Despensas</span>
        </v-btn>

        <v-btn v-else
        @click="despensas">
        <font-awesome-icon icon="fa-solid fa-door-closed" size="xl" />  
          <!-- <span>Video</span> -->
        </v-btn>
  
        <v-btn class="seleccionado"
        v-if="seleccionado === 'compra'"
        @click="compra">
        <font-awesome-icon icon="fa-solid fa-basket-shopping" size="xl" />
          <span>Lista compra</span>
        </v-btn>

        <v-btn v-else
        @click="compra">
        <font-awesome-icon icon="fa-solid fa-basket-shopping" size="xl" />
          </v-btn>

        <v-btn class="seleccionado"
        v-if="seleccionado === 'favoritos'"
        @click="favoritos">
        <font-awesome-icon icon="fa-solid fa-star" size="xl" />
  
          <span>Favoritos</span>
        </v-btn>

        <v-btn v-else @click="favoritos">
            <font-awesome-icon icon="fa-solid fa-star" size="xl" />
          </v-btn>
  
        <v-btn class="seleccionado" v-if="seleccionado === 'preferencias'"
        @click="preferencias">
            <font-awesome-icon  icon="fa-solid fa-gear" size = "xl" />
  
          <span>Preferencias</span>
        </v-btn>
  
        <v-btn v-else  @click="preferencias">
            <font-awesome-icon  icon="fa-solid fa-gear" size = "xl"/>
          </v-btn>
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
                 seleccionado: ''
                //value: 1 
            }
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
            preferencias(){
                //this.seleccionado = 'preferencias'
                this.$router.push('preferencias')
            }
        },
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
    }
</style>