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
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="unidad in unidades"
          :key="unidad.cod_unidad"
        >
        <td><font-awesome-icon  icon="fa-solid fa-pen" size = "xs"/></td>
        <td>{{ unidad.unidad }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-fade-transition hide-on-leave v-if="dialog_add">
            <añadir @cerrar_add="close_add" 
            :origen="origen" @reload="recargar"></añadir>
    </v-fade-transition>
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
                origen: "unidades",
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
                    this.dialog_add = !this.dialog_add
                }
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
</style>