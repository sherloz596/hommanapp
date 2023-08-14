<template>
    <div>
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
            <div v-if="lista_vacia === false">
                <v-table density="compact">
                    <thead>
                    </thead>
                    <tbody>
                        <tr
                        v-for="producto in productos"
                        :key="producto.cod_producto">
                            <td v-if="idioma === 'SPA'">
                            {{producto.producto}}:   
                            </td>
                            <td v-else>
                            {{producto.idioma}}:   
                            </td>
                            <td v-if="idioma === 'SPA'">
                            {{ producto.cantidad }} {{ producto.unidad }}    
                            </td>
                            <td v-else>
                            {{ producto.cantidad }} {{ producto.unidioma }}    
                            </td>
                            <td>                     
                                <div class="sacar">
                                    <span>{{textSacar}}:</span>
                                    <v-text-field
                                    class="in_cant"
                                    :label="labCantidad"
                                    v-model="cantidad[producto.cod_almacenaje]"
                                    hide-details
                                    single-line
                                    compact
                                    type="number"/>
                                    <font-awesome-icon class="icon_btn" icon="fa-solid fa-right-from-bracket" size="xl"
                                    @click="sacarProducto(producto)"/>
                                </div>
                    <!-- </td>
                    <td> -->
                                <font-awesome-icon class="icon_btn" icon="fa-solid fa-angles-right" size="xl"
                                @click="sacarTodo(producto)"/>
                            </td>
                            <v-snackbar
                                v-model="snackbar">
                                {{ text_snackbar }}
                                <template v-slot:actions>
                                    <v-btn
                                        color="pink"
                                        variant="text_snackbar"
                                        @click="snackbar = false">
                                        Close
                                    </v-btn>
                                </template>
                            </v-snackbar>
                        </tr>
                    </tbody>
                </v-table>
            </div>
            <div v-else>
                <h3>
                    {{text_no_prod}}
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
                data(){
            return{
                error_carga: false,
                error_carga_text: "",
                text_no_prod: "",
                idioma: "",
                textSacar:"",
                labCantidad: "",
                productos: [{}],
                pendiente: true,
                unidades: [{}],
                cantidad: [],
                despensas:[{}],
                unit:[],
                despensa:[],
                text_snackbar: "",
                snackbar: false,
                lista_vacia: true
            }
        },
        props:{
            titulo: '',
            cod_despensa: null,
        },
        methods:{
            async cargarProductos(){
                await axios.get('almacenaje/' + this.cod_despensa)
                .then((respuesta)=>{
                    this.productos = respuesta.data
                    if(this.productos[0]===undefined){
                        this.lista_vacia = true
                    }else{
                        this.lista_vacia = false
                    }
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            async sacarProducto(producto){
                if(this.cantidad[producto.cod_almacenaje] != undefined){         
                    let new_qty = producto.cantidad - this.cantidad[producto.cod_almacenaje]
                    if(new_qty < 0){
                        this.text_snackbar = "Cantidad superior a la existente"
                        this.snackbar = true
                    }else if(new_qty > 0){

                        let payload = {
                            cod_producto   : producto.cod_producto,
                            cod_despensa   : producto.cod_despensa,
                            cod_unidad     : producto.cod_unidad,
                            cantidad       : new_qty
                        }
                        await axios.put('almacenajes/' + producto.cod_almacenaje,payload)
                        .then((respuesta)=>{
                            this.cargarProductos()
                        })
                        .catch(error => {
                            if (error.response.status != 0){
                                this.err_despensas_text = "Se ha producido un error"
                                this.err_despensas = true
                            }
                        })
                    }else if (new_qty === 0){

                        this.sacarTodo(producto)
                    }
                }
            },
            async sacarTodo(producto){
                await axios.delete('almacenajes/' + producto.cod_almacenaje)
                .then((respuesta)=>{
                            this.cargarProductos()
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            cargarTextos(){
                if (this.idioma === 'SPA'){
                    this.text_no_prod = "No hay productos almacenados"
                    this.textSacar = 'Sacar'
                    this.labCantidad = 'Cantidad'
                }else{
                    this.text_no_prod = "No products in pantry"
                    this.textSacar = 'Take out'
                    this.labCantidad = 'Quantity'
                }
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
            this.cargarTextos()
            this.cargarProductos()
        }
    }
</script>

<style lang="scss" scoped>
    .sacar{
        display: inline-flex;
        align-items: center;
        font-size: small;
    }
    .icon_btn{
        cursor: pointer;
        margin-left: 25px;
        color: red;
    }
</style>