<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form class="recup_form" fast-fail @submit.prevent="invitar">
            <h2>Enviar invitación</h2>
            <h5>Inserte email de invitado</h5>
              <v-text-field v-model="email" label="Email"></v-text-field>

             
              <v-btn type="submit" color="primary" block class="mt-2"
              v-if="loading === false">Aceptar</v-btn>
              <v-progress-linear color="primary" indeterminate
                v-if="loading === true"></v-progress-linear>
          </v-form>
          <v-alert v-if = "enviado"
          density="compact"
          type="success"
          variant="tonal"
          closable
          :text="text"
          ></v-alert>
      </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
      name: 'invitar',
      data: function() {
          return{
              show1: false,
              email: "",
              password: "",
              enviado: false,
              loading: false,
              text:"",
              loading: false
          }
      },
      methods:{
          async invitar(){
            this.loading = true
              let data_login = {
                  email: this.email,
              }
              await axios.post('invitar',data_login)
              .then (respuesta =>{

                if (respuesta.data.message === "Mail enviado"){
                    let mail = this.email
                    this.text="Invitación enviada a " + mail
                    this.enviado = true
                    this.email = ""
                }
              })
              .catch(error => {
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