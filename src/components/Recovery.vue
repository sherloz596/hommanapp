<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form class="recup_form" fast-fail @submit.prevent="recuperar">
            <h2>Recuperación de contraseña</h2>
            <h5>Inserte su email</h5>
              <v-text-field v-model="email" label="Email"></v-text-field>

             
              <v-btn type="submit" color="primary" block class="mt-2">Aceptar</v-btn>
          </v-form>
          <v-alert v-if = "enviado"
          density="compact"
          type="success"
          variant="tonal"
          closable
          text="Email enviado"
          ></v-alert>
      </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
      name: 'recovery',
      data: function() {
          return{
              show1: false,
              email: "",
              password: "",
              enviado: false,
              loading: false
          }
      },
      methods:{
          async recuperar(){
              let data_login = {
                  email: this.email,
              }
              await axios.post('recovery',data_login)
              .then (respuesta =>{
                //   if (respuesta.data.accessToken != null){
                //       localStorage.setItem('token', respuesta.data.accessToken)
                //       //this.axios.defaults.headers.common['Authorization'] = 'Bearer '+ respuesta.data.accessToken
                //       this.$router.push('dashboard/despensas')
                //   }
                if (respuesta.data.message === "Mail enviado"){
                    this.enviado = true
                    // setTimeout(this.$router.push('/login'),5000)
                }
                // this.$router.push('/login')
              })
              .catch(error => {
                   console.log(error.response.status);
                   if (error.response.status === 401){
                      this.error_login = true
                   }
              })
              this.loading = false
          }
      }
  }
</script>

<style lang="scss" scoped>
    .recup_form{
        padding: 20px;
        background-color: #EEEEEE;
    }
</style>