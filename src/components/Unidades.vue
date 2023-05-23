<template>
    <div>
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_unidad"></v-btn>
        <v-alert v-if = "error_unit"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_unit_text"
                ></v-alert>
        <v-table density="compact" v-if="dialog_add===false">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="unidad in unidades"
          :key="unidad.cod_unidad"
        >
        <td><font-awesome-icon class="edit_icon" icon="fa-solid fa-pen" size = "xs"
            @click="editUnidad(unidad)"/></td>
        <td>
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"
            @click="delUnidad(unidad.cod_unidad)"/></td>
        <td>{{ unidad.unidad }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-fade-transition hide-on-leave v-if="dialog_add">
            <añadir @cerrar_add="close_add" 
            :origen="origen" 
            :item="item"
            @reload="recargar"></añadir>
    </v-fade-transition>
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
    </div>
</template>

<script>
import axios from 'axios'
import Añadir from '../components/Añadir.vue';
    export default {
        data: function() {
            return{
                hay_unidades: false,
                error_unit: false,
                error_unit_text: "",
                dialog_add: false,
                origen: "",
                del_dialog: false,
                eliminar: null,
                item: {},
                unidades:[{
                }],
            }
        },
        components:{
            Añadir
        },
        methods:{
            cargarUnidades:function(){
                    axios.get('units')
                    .then ((respuesta) =>{
                        if(respuesta.status === 200){
                            this.unidades = respuesta.data
                        }
                        if(this.unidades[0].cod_unidad===undefined){
                            this.hay_unidades = false
                        }else{
                            this.hay_unidades = true
                        }        
                    })
                    .catch(error => {
                        if (error.response.status != 0){
                            this.error_unit_text = "Se ha producido un error"
                            this.error_unit = true
                        }
                    })
                },
                close_add(){
                this.dialog_add = false
                // this.error_nombre = false
            },
                add_unidad(){
                    this.origen = "unidades"
                    this.dialog_add = !this.dialog_add
                },
                recargar(){
                    this.cargarUnidades()
                },
                delUnidad(cod_unidad){
                    this.del_dialog = true
                    this.eliminar = cod_unidad
                },
                async del_ok(){
                await axios.delete('units/'+this.eliminar)
                .catch(error => {
                    console.log(error)
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.del_dialog = false
                  this.cargarUnidades()
                },
                editUnidad(unidad){
                    this.origen = "edit_unit"
                    this.item = unidad
                    this.dialog_add = true
                },
            },
            mounted(){
                this.cargarUnidades()
            }
    }
</script>

<style lang="scss" scoped>
    .add_btn{
        position: fixed;
        bottom: 12%;
        right: 4%;
        color: #EEEEEE;
        background-color: #810281;
    }
    .edit_icon{
        margin-right: 15px;
        cursor: pointer;
    }
    .del_icon{
        color: red;
        cursor: pointer;
    }
</style>