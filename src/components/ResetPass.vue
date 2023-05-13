<template>
    <div class="d-flex align-center justify-center" style="height: 100vh" id="app">
        <v-sheet width=100% class="mx-auto">
            <v-form class="form_reg" ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                    <!-- <v-col cols="12">
                        <v-text-field v-model="name" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-2" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <!-- <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12"> -->
                    <v-col cols="12" sm="12" xsm="12">
                        <v-alert v-if = "error_valid"
                    density="compact"
                    type="error"
                    variant="tonal"
                    closable
                    text="Credenciales no válidas"
                    ></v-alert>
                        <v-btn class="boton" x-large block  @click="validate">Aceptar</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-sheet>
    </div>
    </template>
    
    <script>
    import axios from 'axios'
        export default {
            data: function() {
                return{
                    dialog: true,
                    error_valid: false,
        tab: 0,
        tabs: [
            {name:"Login", icon:"mdi-account"},
            {name:"Register", icon:"mdi-account-outline"}
        ],
        valid: true,
        
        name: "",
        email: "",
        password: "",
        verify: "",
        loginPassword: "",
        loginEmail: "",
        loginEmailRules: [
          v => !!v || "Required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        emailRules: [
          v => !!v || "Required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
    
        show1: false,
        rules: {
          required: value => !!value || "Required.",
          min: v => (v && v.length >= 8) || "Min 8 characters"
        }
                }
            },
            computed: {
        passwordMatch() {
          return () => this.password === this.verify || "Password must match";
        }
      },
            methods: {
            async validate() {
                /*
            if (this.$refs.registerForm.validate()) {
                // submit form to server/API here...
            }*/
            if (this.password != null & this.password === this.verify){
                let data_reset = {
                            id: this.$route.params.id,
                            token: this.$route.params.token,
                            password: this.password
                        }
                await axios.post('reset',data_reset)
                        .then (respuesta =>{
                            if(respuesta.data.message === "Reset ok"){
                                this.$router.push('/login')
                            }
                        })
                        .catch(error => {
                            console.log(error.response.status);
                            if (error.response.status === 401){
                                this.error_login = true
                            }
                        })
            }else{
                this.error_valid = true
            }
    
            },
            reset() {
            this.$refs.form.reset();
            },
            resetValidation() {
            this.$refs.form.resetValidation();
            }
        },
        mounted(){
            console.log(this.$route.params.id + " - " + this.$route.params.token)
        }
        }
    </script>
    
    <style lang="scss" scoped>
        .boton{
            margin-top: 10px;
            margin-bottom: 10px;
            color: white;
            background-color: purple;
        }
        .form_reg{
            padding: 20px;
            margin-top: 30px;
        }
    </style>