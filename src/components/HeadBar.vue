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
            <v-list-item prepend-icon="mdi-comment-account-outline" value="lan">
            <v-select
            v-model="lan"
            :items="languages"
            :label="label_lan"
            style="margin-top: 30px;"
            @update:model-value="changeLan">
        </v-select>
            </v-list-item>
            <v-list-item prepend-icon="mdi-weight-gram" :title="uni_tit" value="unit"
            @click="$router.push('unidades')">
            </v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple-plus" :title="invitar_tit" value="invitar"
            @click="$router.push('invitar')">
            </v-list-item>
            <v-list-item prepend-icon="mdi mdi-logout" :title="cerrar_tit" value="logout"
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
            lan: "",
            label_lan:"",
            uni_tit: '',
            invitar_tit: '',
            cerrar_tit: '',
            languages:[
                'ENG',
                'SPA'
            ],
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
                    localStorage.removeItem('idioma')
                    this.$router.push('/login')
                }
            })
            .catch(error => {
                    console.log(error)
                })
           },
           async changeLan(){
            let data_post = {
                idioma: this.lan
           }
            await axios.post('change_lan',data_post)
            .then ((respuesta) =>{
                if (respuesta.data.message === "OK"){
                    localStorage.setItem('idioma', this.lan)
                    location.reload()
                }
            })
            .catch(error => {
                    console.log(error)
                })
           },
           cargar_textos(){
            if (localStorage.getItem('idioma') === 'SPA'){
                this.label_lan = 'idioma'
                this.uni_tit = 'Unidades'
                this.invitar_tit = 'Invitar usuarios'
                this.cerrar_tit = 'Cerrar sesión'
            }else{
                this.label_lan = 'language'
                this.uni_tit = 'Units'
                this.invitar_tit = 'Invite users'
                this.cerrar_tit = 'Logout'
            }
           }
        },
        mounted(){
            this.cargar_textos()
        }
    }
</script>

<style lang="scss" scoped>
    .headbar{
        color: #EEEEEE;
        background-color: #810281;
    }
</style>