<template>
    <v-alert v-if = "err_despensas"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="err_despensas_text"
                ></v-alert>
    <div class="despensas" v-if="dialog === false & dialog_add === false & hay_despensas ===true">
        <v-btn class="btn" block
        
        v-for="despensa in despensas"
        :key="despensa.id" @click="mostrar(despensa.cod_despensa,despensa.despensa)">{{ despensa.despensa }}</v-btn>      
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_despensa"></v-btn>
    </div>
    <!-- Cuadro diálogo para mostrar productos -->
    <v-fade-transition hide-on-leave>
        <v-card
          v-if="dialog"
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
          </template>
          <productos
          :despensa="ver_despensa"></productos>
          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="close_add"
            >
              Close
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
          <!-- Cuadro diálogo para añadir -->
    <v-fade-transition hide-on-leave>
        <v-card
          v-if="dialog_add"
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          title="Nueva despensa"
        >
          <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="close_add"></v-btn>
          </template>
          <v-text-field v-model="nom_despensa" :rules="[rules.required, rules.max]" label="Nombre despensa" maxlength="20" required></v-text-field>
          <div class="pa-4 text-center">
            <v-alert v-if = "error_nombre"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="err_nom_text"
                ></v-alert>
            <v-btn
              class="add_ok text-none"
              color="medium-emphasis"
              rounded
              variant="outlined"
              @click="add_ok"
            >
              Añadir
            </v-btn>
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="close_add"
            >
              Cancelar
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
</template>

<script>
import axios from 'axios'
import Productos from '../components/Productos.vue';
    export default {
        name: 'despensas',
        data(){
            return{
                despensas:[{
                    id:"",
                }],
                dialog:false,
                titulo:"",
                dialog_add:false,
                nom_despensa: "",
                error_nombre: "",
                err_nom_text: "",
                hay_despensas: false,
                err_despensas: "",
                err_despensas_text: "",
                ver_despensa: 0,
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        components:{
            Productos
        },
        methods:{
            cargarDespensas:function(){
                axios.get('despensas')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.despensas = respuesta.data
                    }
                    if(this.despensas[0].cod_despensa===undefined){
                        this.hay_despensas = false
                    }else{
                        this.hay_despensas = true
                    }
                
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            mostrar(id,despensa){
                this.titulo = despensa
                this.ver_despensa = id
                this.dialog = !this.dialog
            },
            close_add(){
                this.dialog_add = false
                this.error_nombre = false
            },
            add_despensa(){
                this.dialog_add = !this.dialog_add
            },
            async add_ok(){
                var nom_despensa = this.nom_despensa.trim()
                var coincide = false

                for (var i = 0;i<this.despensas.length;i++){
                    console.log(nom_despensa.toLocaleUpperCase())
                    if (nom_despensa.toLocaleUpperCase() === this.despensas[i].despensa.toLocaleUpperCase()){
                        coincide = true
                        break
                    }
                }
                if (nom_despensa != null & nom_despensa != "" & nom_despensa.length <= 20 
                & coincide === false){
                    var data = {
                    despensa: this.nom_despensa,
                    }
                    await axios.post('despensas',data)
                    .then (respuesta =>{
                    if (respuesta.data.despensa === nom_despensa){
                        this.cargarDespensas()
                        this.dialog_add = false
                    }
                })
                .catch(error => {
                     console.log(error.response.status);
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                    
                }
            }
        },
        mounted(){
            this.cargarDespensas()
        } 
    }
</script>

<style lang="scss" scoped>
    .despensas{
        padding: 10px;
        padding-right: 30px;
    }
    .btn{
        color: #EEEEEE;
        background-color: #810281;
        margin: 10px;
    }
    .add_btn{
        position: fixed;
        bottom: 12%;
        right: 4%;
        color: #EEEEEE;
        background-color: #810281;
    }
    .add_ok{
        margin-right: 10px;
    }
</style>