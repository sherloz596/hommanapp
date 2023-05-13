<template>
    <div>
        <!-- <v-app-bar
          class="headbar"
          color="#810281"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
  
          <v-toolbar-title>HommanApp</v-toolbar-title>
    
        </v-app-bar> -->
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
        <v-app-bar class="headbar">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>HommanApp - {{ titulo }}</v-toolbar-title>

        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          temporary
        >
          <v-list>
            <v-list-item prepend-icon="mdi-weight-gram" title="Unidades" value="unit"
            @click="$router.push('unidades')">
            </v-list-item>
            <v-list-item prepend-icon="mdi mdi-logout" title="Cerrar sesión" value="logout"
            @click="logout">
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: () => ({
            drawer: false,
            group: null,
        }),
        props:{
            titulo: ""
        },
        methods:{
           async logout(){
            await axios.get('logout')
            .then ((respuesta) =>{
                if (respuesta.data.message === "Logout OK"){
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                }
            })
            .catch(error => {
                    console.log(error)
                })
           }
        }
    }
</script>

<style lang="scss" scoped>
    .headbar{
        color: #EEEEEE;
        background-color: #810281;
    }
</style>