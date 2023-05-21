<template>
    <div>
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_producto"></v-btn>
        <v-alert v-if = "error_prod"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_prod_text"
                ></v-alert>
        <div v-if="error_prod === false & dialog_add === false">
                <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-table class="tabla" density="compact" :search="search" :items="productos">
            <h2>{{ despensa }}</h2>
      <thead>

      </thead>
      <tbody>
        <tr
          v-for="producto in productos"
          :key="producto.cod_producto"
        >
        <v-row no-gutters class="columna">
<!-- CAMBIOS RESPONSIVE -->
    <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>
    <v-col cols="1" class="d-flex justify-center align-center">
        <td v-if="tipo === 4">
            <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"/></td>
            <!-- <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"/></td> -->
    </v-col>
    <v-col cols="1" class="d-flex justify-center align-center">
        <td v-if="tipo === 4" style="text-align: center;">
            <!-- <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"/> -->
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"
            @click="delProducto(producto.cod_producto)"/></td>
        <!-- <td v-if="tipo === 4"><font-awesome-icon  icon="fa-solid fa-trash-can" size = "xs"/></td> -->
    </v-col>
    <v-col cols="8" lg="6" class="d-flex justify-left align-center">

        <td v-if="idioma==='SPA'">{{ producto.producto }}</td>
        <td v-else>{{ producto.idioma }}</td>
    </v-col>
    <v-col cols="1" class="d-flex justify-center align-center">
        <td v-if="producto.comprar === 1" class="comp_sel">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-basket-shopping" size = "xs"
            @click="upComprar(producto)"/>
        </td>
        <td v-else class="icon_des">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-basket-shopping" size = "xs"
            @click="upComprar(producto)"/>
        </td>
    </v-col>

    <v-col cols="1" class="d-flex justify-center align-center">

        <td v-if="producto.favorito === 1" class="fav_sel">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
            @click="upFavorito(producto)"/>
        </td>
        <td v-else class="icon_des">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
            @click="upFavorito(producto)"/>
        </td>
    </v-col>
    <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>

          <!-- <td>{{ producto.cantidad }}</td> -->
        </v-row>
        </tr>
        <tr>
            <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>
            <v-col cols="12" lg="10" class="d-flex" style="background-color: #EEEEEE;"></v-col>
            <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>
        </tr>
        <!-- <tr>
            <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>
            <v-col cols="12" lg="10" class="d-flex" style="background-color: #EEEEEE;"></v-col>
            <v-col lg="1" class="d-flex" style="background-color: #810281;"></v-col>
        </tr> -->
        <!-- <tr>
            <td></td>
        </tr> -->

            </tbody>
            </v-table>
        </div>
        <v-fade-transition hide-on-leave v-if="dialog_add">
            <añadir @cerrar_add="close_add" 
            :origen="origen" @reload="recargar"></añadir>
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
          <v-text-field v-model="nom_producto" :rules="[rules.required, rules.max]" 
          label="Producto" maxlength="20" required></v-text-field>
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
                hay_productos: false,
                err_despensas: false,
                err_productos_text: "",
                error_prod: false,
                error_prod_text: "",
                cod_lista_curso: 0,
                search: '',
                idioma: "",
                dialog_add: false,
                nom_producto: "",
                error_nombre: false,
                origen: "productos",
                del_dialog: false,
                eliminar: null,
                productos:[{}],
                compra:[{
                }],
                favoritos:[{
                }],
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
                this.cargarProductos()
            },
            cargarProductos:function(){
                axios.get('productos')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                        if(this.tipo === 2){
                            this.productos=this.productos.filter(function (producto) {
                                return (producto.comprar == 1);
                            });
                        }
                        if(this.tipo === 3){
                            this.productos=this.productos.filter(function (producto) {
                                return (producto.favorito == 1);
                            });
                        }
                    }
                    if(this.productos[0].cod_producto===undefined){
                        this.hay_productos = false
                    }else{
                        this.hay_productos = true
                    }

                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_prod_text = "Se ha producido un error"
                        this.error_prod = true
                    }
                })
            },
            cargarVistaProductos:function(){
                axios.get('almacenaje/${this.despensa}')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                    }
                    if(this.productos[0].cod_producto===undefined){
                        this.hay_productos = false
                    }else{
                        this.hay_productos = true
                    }

                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            cargarCompraCurso:function(){
                axios.get('lista_curso')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.cod_lista_curso = respuesta.data.cod_lista
                    }
                })
                .catch(error => {
                    if (error.response.status != 0){

                    }
                })
            },
            async upComprar(producto){
                // let val_comprar
                // if (producto.comprar === 0){


                //     val_comprar = 1
                // }else{
                //     val_comprar = 0
                // }
                let payload = {
                    producto: producto.producto,
                    cod_usuario: producto.cod_usuario,
                    comprar: producto.comprar,
                    favorito: producto.favorito,
                    idioma: producto.idioma
                }
                  await axios.put('up_comprar/'+producto.cod_producto,payload)
                //  await axios.put('up_comprar',payload)
                  .catch(error => {
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.cargarProductos()
            },
            async upFavorito(producto){
                let val_favorito
                if (producto.favorito === 0){
                    val_favorito = 1
                }else{
                    val_favorito = 0
                }
                let payload = {
                    producto: producto.producto,
                    cod_usuario: producto.cod_usuario,
                    comprar: producto.comprar,
                    favorito: val_favorito,
                    idioma: producto.idioma
                }
                  await axios.put('productos/'+producto.cod_producto,payload)
                  .catch(error => {
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.cargarProductos()
            },
            filtrarCompra(){
                this.productos=this.productos.filter(function (producto) {
                     return (producto.comprar == 1);
                });
         //       this.productos = this.productos.filter(producto=>producto.comprar === 1)
            },
            getProductos(){
                return "getprod"
            },
            add_producto(){
                this.dialog_add = !this.dialog_add
            },
            close_add(){
                this.dialog_add = false
                // this.error_nombre = false
            },
            delProducto(cod_producto){
                this.del_dialog = true
                this.eliminar = cod_producto
            },
            async del_ok(){
                await axios.delete('productos/'+this.eliminar)
                .catch(error => {
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.del_dialog = false
                  this.cargarProductos()
            },
            recargar(){
                this.cargarProductos()
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
            this.cargarDatos()
            this.cargarCompraCurso()
            if (this.tipo ===2){
                this.filtrarCompra()
            }
        }
    }
</script>

<style lang="scss" scoped>

    .comp_sel{
        color: green;
    }
    .fav_sel{
        color: yellow;
    }
    .icon_des{
        color: grey;
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
    .columna{
        background-color: #EEEEEE;
        // text-align: center;
        // padding-top: 20%;
        // padding-bottom: 1%;
        height: 5vh;
    }
    .add_btn{
        position: fixed;
        bottom: 12%;
        right: 4%;
        color: #EEEEEE;
        background-color: #810281;
    }
</style>