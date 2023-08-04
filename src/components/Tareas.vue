<template>
    <div>
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_tarea"></v-btn>
        <v-alert v-if = "error_tarea"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_tarea_text"
                ></v-alert>
        <div v-if="error_tarea === false & dialog_add === false">
        <v-table class="tabla" density="compact" :items="tareas">
      <thead>
        <tr>
        <th cols="1" class="d-flex justify-center align-center">
        </th>
            <th><h3>Tarea</h3></th>
            <th><h3>Frecuencia</h3></th>
            <th><h3>Última vez</h3></th>
            <th><h3>Realizado</h3></th>
    </tr>
      </thead>
      <tbody>
        <tr
          v-for="tarea in tareas"
          :key="tarea.cod_tarea"
        >
        <td>
            <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"
            @click="editTarea(tarea)"/>
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"
            @click="delTarea(tarea.cod_tarea)"/></td>

        <td>{{ tarea.tarea }}</td>
        <td>{{ tarea.frecuencia }}</td>
        <td>{{ tarea.ultimo_realizado }}</td>
        <td class="comp_sel">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-clipboard-check" size = "lg"
            @click="upRealizada(tarea)"/>
        </td>
        </tr>

            </tbody>
            </v-table>
        </div>
        <v-fade-transition hide-on-leave v-if="dialog_add">
            <añadir @cerrar_add="close_add" 
            :origen="origen" 
            :cod_item="cod_item"
            :nom_item="nom_item"
            :nom_idioma="nom_idioma"
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
          <v-card-text>¿Está seguro de eliminar la tarea?</v-card-text>
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
                hay_tareas: false,
                err_despensas: false,
                err_tareas_text: "",
                error_tarea: false,
                error_tarea_text: "",
                cod_lista_curso: 0,
                idioma: "",
                dialog_add: false,
                nom_tarea: "",
                error_nombre: false,
                origen: "",
                del_dialog: false,
                eliminar: null,
                cod_item: null,
                nom_item: "",
                nom_idioma: "",
                item: undefined,
                tareas:[{}],
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        props:{
            tipo: 0,
            despensa:0
        },
        components:{
            Añadir
        },
        methods: {
            cargarDatos(){
                this.cargarTareas()
            },
            cargarTareas:function(){
                axios.get('tareas')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.tareas = respuesta.data
                       
                    }
                    if(this.tareas[0].cod_tarea===undefined){
                        this.hay_tareas = false
                    }else{
                        this.hay_tareas = true
                    }

                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_tarea_text = "Se ha producido un error"
                        this.error_tarea = true
                    }
                })
            },
             async upRealizada(tarea){
                var fecha = new Date()
                var fechaformat = (fecha.getDay()-1) + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear()
                let payload = {
                    tarea: tarea.tarea,
                    frecuencia: tarea.frecuencia,
                    ultimo_realizado: fechaformat
                }
                  await axios.put('tareas/'+tarea.cod_tarea,payload)
                //  await axios.put('up_comprar',payload)
                  .catch(error => {
                      if (error.response.status != 0){
                          this.error_tarea_text = "Se ha producido un error"
                          this.error_tarea = true
                      }
                  })
                  this.cargarTareas()
            },
            add_tarea(){
                this.origen = "tareas"
                this.dialog_add = !this.dialog_add
            },
            close_add(){
                this.dialog_add = false
                // this.error_nombre = false
            },
            editTarea(tarea){
                this.origen = "edit_tarea"
                this.item = tarea
                this.dialog_add = true
            },
            delTarea(cod_tarea){
                this.del_dialog = true
                this.eliminar = cod_tarea
            },
            async del_ok(){
                await axios.delete('tareas/'+this.eliminar)
                .catch(error => {
                    console.log(error)
                      if (error.response.status != 0){
                          this.error_tarea_text = "Se ha producido un error"
                          this.error_tarea = true
                      }
                  })
                  this.del_dialog = false
                  this.cargarTareas()
            },
            recargar(){
                this.cargarTareas()
            }
        },
        mounted(){
            this.cargarDatos()
        }
    }
</script>

<style lang="scss" scoped>

    .comp_sel{
        color: green;
    }
    .edit_icon{
        margin-right: 15px;
        cursor: pointer;
    }
    .del_icon{
        color: red;
        cursor: pointer;
    }
    .icon_btn{
        cursor: pointer;
    }
    .tabla{
        background-color: #EEEEEE;
    }

    .add_btn{
        position: fixed;
        bottom: 12%;
        right: 15%;
        color: #EEEEEE;
        background-color: #810281;
    }
</style>