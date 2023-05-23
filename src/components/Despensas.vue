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
        :key="despensa.id" @click="mostrar(despensa)">
        <span v-if="idioma === 'SPA'">{{ despensa.despensa }}</span>
        <span v-else>{{ despensa.idioma }}</span>
        </v-btn>      
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_despensa"></v-btn>
    </div>
    <!-- Cuadro diálogo para mostrar productos -->
    <v-fade-transition hide-on-leave>
        <v-card
          v-if="dialog & del_dialog === false"
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"
            @click="editDespensa()"/>
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"
            @click="delDespensa()"/>
            <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
          </template>
          <despensas-tabla :cod_despensa="ver_despensa"></despensas-tabla>
          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="dialog = false"
            >
              Close
            </v-btn>
          </div>
        </v-card>
        <v-dialog
        v-model="del_dialog"
        persistent
        width="auto"
      >
        <v-card>
          <v-card-title class="text-h5">
            Eliminar
          </v-card-title>
          <v-card-text>¿Está seguro de eliminar el producto?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="del_dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="del_ok"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-fade-transition>
          <!-- Cuadro diálogo para añadir -->
    <v-fade-transition hide-on-leave v-if="dialog_add">
        <añadir @cerrar_add="close_add" 
            :origen="origen" 
            :item="item"
             @reload="recargar"></añadir>
        <!-- <v-card
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
        </v-card> -->
      </v-fade-transition>
</template>

<script>
import axios from 'axios'
import DespensasTabla from '../components/DespensasTabla.vue';
import Añadir from '../components/Añadir.vue';
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
                del_dialog: false,
                eliminar: null,
                idioma: "",
                origen: "",
                despensa_sel: {},
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        components:{
            DespensasTabla,
            Añadir
        },
        methods:{
            async cargarDespensas(){
                await axios.get('despensas')
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
                    console.log(error)
                    if (error.response.status != 0){
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            mostrar(despensa){
                this.despensa_sel = despensa
                this.titulo = despensa.despensa
                this.ver_despensa = despensa.cod_despensa
                this.dialog = !this.dialog
            },
            close_add(){
                this.dialog = !this.dialog
                this.dialog_add = false
                this.error_nombre = false
            },
            add_despensa(){
                this.origen = "despensas"
                this.dialog_add = !this.dialog_add
            },
            recargar(){
                this.cargarDespensas()
            },
            delDespensa(){
                this.del_dialog = true
                this.eliminar = this.ver_despensa
            },
            async del_ok(){
                await axios.delete('despensas/'+this.eliminar)
                .catch(error => {
                    console.log(error)
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.del_dialog = false
                  this.dialog = false
                  this.cargarDespensas()
            },
            editDespensa(){
                this.dialog = false
                this.origen = "edit_despensa"
                this.item = this.despensa_sel
                this.dialog_add = true
            },
            // async add_ok(){
            //     var nom_despensa = this.nom_despensa.trim()
            //     var coincide = false

            //     for (var i = 0;i<this.despensas.length;i++){
            //         console.log(nom_despensa.toLocaleUpperCase())
            //         if (nom_despensa.toLocaleUpperCase() === this.despensas[i].despensa.toLocaleUpperCase()){
            //             coincide = true
            //             break
            //         }
            //     }
            //     if (nom_despensa != null & nom_despensa != "" & nom_despensa.length <= 20 
            //     & coincide === false){
            //         var data = {
            //         despensa: this.nom_despensa,
            //         idioma: ""
            //         }
            //         await axios.post('despensas',data)
            //         .then (respuesta =>{
            //         if (respuesta.data.despensa === nom_despensa){
            //             this.cargarDespensas()
            //             this.dialog_add = false
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error)
            //          console.log(error.response.status);
            //          if (error.response.status === 401){
            //             this.err_nom_text = "Se ha producido un error"
            //             this.error_nombre = true
            //          }
            //     })
            //     }else{
            //         if (coincide){
            //             this.err_nom_text = "El nombre ya está en uso"
            //             this.error_nombre = true
            //         }else{
            //             this.err_nom_text = "Nombre no válido"
            //             this.error_nombre = true
            //         }
                    
            //     }
            // }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
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
    .edit_icon{
        margin-right: 15px;
        cursor: pointer;
    }
    .del_icon{
        color: red;
        margin-right: 15px;
        cursor: pointer;
    }
</style>