<template>
      <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form class="form_login" fast-fail @submit.prevent="login">
                <v-text-field v-model="email" label="Email"></v-text-field>

                <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
                <p class="text-body-2"><router-link to="recovery">¿Olvidaste tu contraseña?</router-link></p>
                <v-btn type="submit" color="primary" block class="mt-2"
                v-if="loading === false">Iniciar sesión</v-btn>
                <v-progress-linear color="primary" indeterminate
                v-if="loading === true"></v-progress-linear>
                <div class="mt-2">
                    <p class="text-body-2">¿No tienes cuenta? <router-link to="registro">Regístrate</router-link></p>
                </div>
            </v-form>
            
            <v-alert v-if = "error_login"
            density="compact"
            type="error"
            variant="tonal"
            closable
            text="Credenciales no válidas"
            ></v-alert>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'login',
        data: function() {
            return{
                show1: false,
                email: "",
                password: "",
                error_login: false,
                loading: false
            }
        },
        methods:{
            async login(){
                let data_login = {
                    email: this.email,
                    password: this.password
                }
                this.loading = true
                await axios.post('login',data_login)
                .then (respuesta =>{
                    if (respuesta.data.accessToken != null){
                        console.log(respuesta.data.user)
                        localStorage.setItem('token', respuesta.data.accessToken)
                        localStorage.setItem('idioma', respuesta.data.user.idioma)
                        //this.axios.defaults.headers.common['Authorization'] = 'Bearer '+ respuesta.data.accessToken
                        //  this.$router.push('dashboard/despensas')
                    }
                })
                .catch(error => {
                     console.log(error.response.status);
                     if (error.response.status === 401){
                        this.error_login = true
                     }
                })
                while(localStorage.getItem('token')===null){
                    
                }
                this.loading = false
                this.$router.push('dashboard/despensas')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form_login{
        padding: 20px;
    }
</style>