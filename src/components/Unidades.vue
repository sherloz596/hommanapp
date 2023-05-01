<template>
    <div>
        <v-alert v-if = "error_unit"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_unit_text"
                ></v-alert>
        <v-table density="compact">
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
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: function() {
            return{
                hay_unidades: false,
                error_unit: false,
                error_unit_text: "",
                unidades:[{
                }],
            }
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
                }
            },
            mounted(){
                this.cargarUnidades()
            }
    }
</script>

<style lang="scss" scoped>

</style>