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
        <div v-if="dialog === false">
        <div class="padd">
        <div class="anteriores" @click="$router.push('anteriores')">
            <!-- <v-btn class="btn_old" block > -->
                <span v-if="idioma==='SPA'">Compras anteriores</span>
                <span v-else>Previous purchase</span>
            <v-badge v-if="hay_pendientes" inline color="red" :content="num_pendientes"></v-badge>
            <!-- </v-btn> -->
            <span class="almac_text" v-if="hay_pendientes">{{textPorAlmac}}</span>
        </div>
        </div> 

        <div v-if="lista_vacia === false">
            <div style="padding-left: 30px;">
                <h3>{{tituloLista}}
                    <v-btn @click="editLista()">{{botonEdit}}</v-btn> 
                </h3>
            </div>
            <v-table class="tabla" density="compact">
                <thead>
                    
                </thead>
                <tbody>
                    <tr
                    v-for="producto in productos"
                    :key="producto.cod_producto"
                    >
                    <td v-if="producto.estado_producto==='En curso' & idioma ==='SPA'">
                        <font-awesome-icon v-if="edit_lista" 
                        class="icon_btn" icon="fa-solid fa-trash-can" size = "xs"
                        @click="delProducto(producto)"/>
                        {{ producto.producto }}
                    </td>
                    <td v-if="producto.estado_producto==='Comprado' & idioma ==='SPA'" class="comprado">
                        <font-awesome-icon v-if="edit_lista" 
                        class="icon_btn" icon="fa-solid fa-trash-can" size = "xs"
                        @click="delProducto(producto)"/>
                        {{ producto.producto }}
                    </td>
                    <td v-if="producto.estado_producto==='En curso' & idioma ==='ENG'">
                        <font-awesome-icon v-if="edit_lista" 
                        class="icon_btn" icon="fa-solid fa-trash-can" size = "xs"
                        @click="delProducto(producto)"/>
                        {{ producto.idioma }}
                    </td>
                    <td v-if="producto.estado_producto==='Comprado' & idioma ==='ENG'" class="comprado">
                        <font-awesome-icon v-if="edit_lista" 
                        class="icon_btn" icon="fa-solid fa-trash-can" size = "xs"
                        @click="delProducto(producto)"/>
                        {{ producto.idioma }}
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
                <v-btn v-if="idioma==='SPA'" color="success" @click="validarCompra()">
                    Validar compra
                </v-btn>
                <v-btn v-else color="success" @click="validarCompra()">
                    Confirm purchase
                </v-btn>
            </div>
        </div>
        <div v-else>
            <h3 v-if="idioma==='SPA'">
                La lista de la compra está vacía
            </h3>
            <h3 v-else>The shopping list is empty</h3>
        </div>
    </div>
    <dialogo-ver 
            :data_dialog="data_dialog"
            :titulo = "data_dialog_tit"
            v-else
            @closeDialog="closeDialog">
        </dialogo-ver>
    </div>
</template>

<script>
import axios from 'axios'
import DialogoVer from '../components/DialogoVer.vue';

    export default {
        data: function() {
            return{
                lista_vacia: false,
                productos:[{}],
                error_carga: "",
                error_carga_text: "",
                ver_validar: false,
                edit_lista: false,
                hay_pendientes: false,
                num_pendientes: 0,
                tituloLista: "",
                botonEdit: "",
                textPorAlmac: "",
                listas:[{}],
                listas_pendientes:[{}],
                data_dialog_tit: "Compras anteriores",
                dialog: false,
                data_dialog: "compras_anteriores",
                idioma: ""
            }
        },
        components:{
            DialogoVer
        },
        methods:{
            editLista(){
                this.edit_lista = !this.edit_lista
            },
            async cargarListas(){
                await axios.get('lista_compra')
                .then((respuesta) =>{
                    this.listas = respuesta.data
                    this.listas_pendientes = this.listas.filter(function (lista) {
                                return (lista.estado==="Pendiente")
                            });
                    if(this.listas_pendientes[0]===undefined){
                        this.hay_pendientes = false
                    }else{
                        this.num_pendientes = this.listas_pendientes.length
                        this.hay_pendientes = true
                    }
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async cargarCompras(){
                await axios.get('compra_curso')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                    }
                    if(this.productos[0]===undefined){
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
                this.activaValidar()
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
                // this.activaValidar()
            },
            activaValidar(){
                let comprados = []
                comprados = this.productos.filter(function (producto) {
                                return (producto.estado_producto==="Comprado")
                            });
                if(comprados.length>0){
                    this.ver_validar = true
                }else{
                    this.ver_validar = false
                }
            },
            async validarCompra(){
                var cod_lista
                let fecha = new Date()                
                let payload = {
                    nombre: fecha.toLocaleString(),
                    estado: 'Pendiente'
                }
                await axios.post('lista_compra',payload)
                .then ((respuesta) =>{
                    cod_lista = respuesta.data.cod_lista
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })

                let comprados = []
                comprados = this.productos.filter(function (producto) {
                                return (producto.estado_producto==="Comprado")
                            });
                for (let i = 0; i < comprados.length; i++){
                        this.guardarLineas(cod_lista,comprados[i])
                        this.borrarComprados(comprados[i])
                        this.upComprar(comprados[i])
                }
                this.cargarCompras()
            },
            async guardarLineas(cod_lista,producto){
                let payload = {
                    cod_lista: cod_lista,
                    cod_producto: producto.cod_producto,
                    nombre: '',
                    estado_producto: 'Pendiente' 
                }
                await axios.post('lista_compra_lin',payload)
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async borrarComprados(producto){
                await axios.delete('lista_compra_lin/'+producto.cod_linea)
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            async upComprar(producto){
                let payload = {
                    producto: producto.producto,
                    cod_usuario: producto.cod_usuario,
                    comprar: 0,
                    favorito: producto.favorito,
                    idioma: producto.idioma
                }
                  await axios.put('productos/'+producto.cod_producto,payload)
                  .catch(error => {
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
            },
            closeDialog(){
                this.dialog = false
            },
            dialogAnteriores(){
                this.dialog = true
            },
            delProducto(producto){
                this.borrarComprados(producto)
                this.upComprar(producto)
                this.cargarCompras()
            },
            cargarTextos(){
                if(this.idioma === 'SPA'){
                    this.tituloLista = 'Lista de la compra'
                    this.botonEdit = 'Editar'
                    this.textPorAlmac = "Por almacenar"
                }else{
                    this.tituloLista = 'Shopping list'
                    this.botonEdit = 'Edit'
                    this.textPorAlmac = "To store"
                }
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
            this.cargarTextos()
            this.cargarListas()
            this.cargarCompras()
        } 
    }
</script>

<style lang="scss" scoped>
    .btn_old{
        color: #EEEEEE;
        background-color: #810281;
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
    .anteriores{
        display: inline-flex;
        width: 100%;
        height: 30px;
        align-items: center;
        justify-content: center;
        padding: 20px;
        color: #EEEEEE;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #810281;
        cursor: pointer;
    }
    .padd{
        padding: 25px;
    }
    .almac_text{
        color: #FFAFAF;
        font-size: small;
    }
    .tabla{
        background-color: #EEEEEE;
    }
</style>