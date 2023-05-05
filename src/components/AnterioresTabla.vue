<template>
    <div v-if = "error_carga">
        <v-alert 
            density="compact"
            type="error"
            variant="tonal"
            closable
            :text="error_carga_text">
        </v-alert>
    </div>
    <div v-else>
        <v-fade-transition hide-on-leave>
        <v-card
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="closeDialog()"></v-btn>
          </template>
          <v-table density="compact">
      <thead>
      </thead>
      <tbody>
        <tr
          v-for="producto in productos"
          :key="producto.cod_producto"
        >
        
        <td >
            <v-badge v-if="producto.estado_producto === 'Pendiente'" 
            dot inline color="red"></v-badge>
        {{ producto.producto }}
            
        </td>
        <td>                     
            <div class="guardar" v-if="producto.estado_producto === 'Pendiente'">
                <span>Guardar</span>
                <v-text-field
                class="in_cant"
                label="Cantidad"
                v-model="cantidad[producto.cod_linea]"
                hide-details
                single-line
                compact
                type="number"/>

                <v-select
                class="combo"
              v-model="unit[producto.cod_linea]"
              :items="unidades"
              item-title="unidad"
              item-value="cod_unidad"
            ></v-select>
               <span>en</span>
               <v-select
                class="combo"
              v-model="despensa[producto.cod_linea]"
              :items="despensas"
              item-title="despensa"
              item-value="cod_despensa"
            ></v-select>
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-right-to-bracket" size="xl"
            @click="almacenar(producto)"/>
            </div>
            <div v-else>
                <font-awesome-icon icon="fa-solid fa-check" style="color:green;" size="xl"/>
            </div>
        </td>
        </tr>
      </tbody>
    </v-table>
          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="closeDialog()"
            >
              Close
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                error_carga: false,
                error_carga_text: "",
                productos: [{}],
                pendiente: true,
                unidades: [{}],
                cantidad: [],
                despensas:[{}],
                unit:[],
                despensa:[]
            }
        },
        props:{
            titulo: '',
            cod_lista: null,
        },
        methods:{
            closeDialog(){
                this.$emit("closeDialog")
            },
            async cargaCompra(){
                await axios.get('ver_anteriores/'+this.cod_lista)
                .then ((respuesta) =>{
                    this.productos = respuesta.data
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async cargaUnidades(){
                await axios.get('units')
                .then ((respuesta) =>{
                    this.unidades = respuesta.data
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async cargaDespensas(){
                await axios.get('despensas')
                .then ((respuesta) =>{
                    this.despensas = respuesta.data
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async almacenar(producto){
                let linea = producto.cod_linea
                if (this.despensa[linea] != "" & this.unit[linea] != "" & this.cantidad[linea] > 0){
                    let payload = {
                        cod_producto: producto.cod_producto,
                        cod_despensa: this.despensa[linea],
                        cod_unidad: this.unit[linea],
                        cantidad: this.cantidad[linea]
                    }
                    await axios.post('almacenajes',payload)
                    .then ((respuesta) =>{
                        if (respuesta.data!= undefined){
                            this.marcarAlmacenado(producto)
                            this.cargaCompra()
                            
                        }
                    })
                    .catch(error => {
                        if (error){
                            if (error.response.status != 0){
                                this.error_carga_text = "Se ha producido un error"
                                this.error_carga = true
                            }
                        }
                    })
                    this.comprobarCompleta()
                }
            },
            marcarAlmacenado:function(producto){
                let payload = {
                    cod_lista: producto.cod_lista,
                    cod_producto: producto.cod_producto,
                    estado_producto: "Almacenado"
                }

                axios.put('lista_compra_lin/'+producto.cod_linea,payload)
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async comprobarCompleta(){
                let completa = true
                for (let i = 0; i < this.productos.length; i++){
                    console.log(i+": "+this.productos[i].estado_producto)
                    if (this.productos[i].estado_producto === "Pendiente"){
                        completa = false
                        return
                    }
                }
                if (completa === true){
                    this.completarCompra()
                }
            },
            async completarCompra(){
                let payload ={
                    nombre: this.titulo,
                    estado: "Almacenada"
                }
                console.log(payload)
                await axios.put('lista_compra/'+this.cod_lista,payload)
                .catch(error => {
                    console.log(error)
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            }
        },
        mounted() {
            this.cargaCompra()
            this.cargaUnidades()
            this.cargaDespensas()
        },
    }
</script>

<style lang="scss" scoped>
    .guardar{
        display: inline-flex;
        align-items: center;
        font-size: small;
    }
    .in_cant{
        width: 80px;
        margin-left: 10px;
    }
    .combo{
        margin-top: 22px;
        margin-left: 10px;
        font-size: small;
    }
    .icon_btn{
        cursor: pointer;
        margin-left: 25px;
        color: green;
    }
</style>