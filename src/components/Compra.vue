<template>
    <div v-if = "error_carga">
        <v-alert 
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_carga_text"
                ></v-alert>
    </div>
    <div v-else>
        <div>
            <v-btn class="btn_old" block >
                Compras anteriores
            </v-btn>
        </div>
        <div v-if="lista_vacia === false">
            <v-table density="compact">
                <thead>
                    <h3>Lista de la compra
                        <v-btn>Editar</v-btn> 
                    </h3>
                </thead>
                <tbody>
                    <tr
                    v-for="producto in productos"
                    :key="producto.cod_producto"
                    >
                    <td v-if="producto.estado_producto==='En curso'">
                        {{ producto.producto }}
                    </td>
                    <td v-if="producto.estado_producto==='Comprado'" class="comprado">
                        {{ producto.producto }}
                    </td>
                    <td v-if="producto.estado_producto==='En curso'">
                        <font-awesome-icon 
                        class="icon_btn" icon="fa-solid fa-square-check" size = "lg"
                        @click="marcarComprado(producto)"/>
                    </td>
                    <td v-if="producto.estado_producto==='Comprado'" class="comprado">
                        <font-awesome-icon class="icon_btn" icon="fa-solid fa-square-check" size = "lg"/>
                    </td>
                    <td v-if="producto.estado_producto==='Comprado'" class="comprado__undo">
                        <font-awesome-icon 
                        class="icon_btn" icon="fa-solid fa-rotate-left" size = "lg"
                        @click="marcarComprado(producto)"/>
                    </td>
                    <!-- <td v-if="producto.favorito === 1" class="fav_sel">
                        <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
                        @click="upFavorito(producto)"/>
                    </td>
                    <td v-else class="icon_des">
                        <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
                        @click="upFavorito(producto)"/>
                    </td> -->
                    </tr>
                </tbody>
            </v-table>
            <div class="val_compra" v-if="ver_validar">
                <v-btn color="success" @click="validarCompra()">
                    Validar compra
                </v-btn>
            </div>
        </div>
        <div v-else>
            <h3>
                La lista de la compra está vacía
            </h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: function() {
            return{
                lista_vacia: false,
                 productos:[{}],
                 error_carga: "",
                 error_carga_text: "",
                 ver_validar: false
            }
        },
        components:{
        },
        methods:{
            cargarCompras:function(){
                axios.get('compra')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                    }
                    if(this.productos[0].cod_producto===undefined){
                        this.lista_vacia = true
                    }else{
                        this.lista_vacia = false
                    }
                
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            marcarComprado:function(producto){
                let new_estado = ""
                if (producto.estado_producto === "En curso"){
                    new_estado = "Comprado"
                }else{
                    new_estado = "En curso"
                }
                let payload = {
                    cod_lista: producto.cod_lista,
                    cod_producto: producto.cod_producto,
                    estado_producto: new_estado
                }
                axios.put('lista_compra_lin/'+producto.cod_linea,payload)
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
                this.cargarCompras()
                this.activaValidar()
            },
            activaValidar(){
                let comprados = []
                console.log(comprados)
                comprados = this.productos.filter(function (producto) {
                                return (producto.estado_producto==="Comprado")
                            });
                if(comprados.length>0){
                    this.ver_validar = true
                }else{
                    this.ver_validar = false
                }
                console.log(comprados.length)
            },
            validarCompra(){

            }
        },
        mounted(){
            this.cargarCompras()
        } 
    }
</script>

<style lang="scss" scoped>
    .btn_old{
        color: green;
    }
    .comprado{
        color: green;
        background-color: lightgreen;
        text-decoration: line-through;
    }
    .comprado__undo{
            color:black;
            background-color: lightgreen;
        }
    .icon_btn{
        cursor: pointer;
    }
    .val_compra{
        position: fixed;
        bottom: 12%;
        text-align: center;
        width: 100%;
    }
</style>