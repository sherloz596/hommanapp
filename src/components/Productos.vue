<template>
    <div>
        <v-alert v-if = "error_prod"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="error_prod_text"
                ></v-alert>
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
        <td v-if="tipo === 4">
            <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"/>
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"/></td>
        <!-- <td v-if="tipo === 4"><font-awesome-icon  icon="fa-solid fa-trash-can" size = "xs"/></td> -->
        <td>{{ producto.producto }}</td>
        <td v-if="producto.comprar === 1" class="comp_sel">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-basket-shopping" size = "xs"
            @click="upComprar(producto)"/>
        </td>
        <td v-else class="icon_des">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-basket-shopping" size = "xs"
            @click="upComprar(producto)"/>
        </td>
        <td v-if="producto.favorito === 1" class="fav_sel">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
            @click="upFavorito(producto)"/>
        </td>
        <td v-else class="icon_des">
            <font-awesome-icon class="icon_btn" icon="fa-solid fa-star" size = "xs"
            @click="upFavorito(producto)"/>
        </td>
          <!-- <td>{{ producto.cantidad }}</td> -->
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
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
                hay_productos: false,
                err_despensas: false,
                err_productos_text: "",
                error_prod: false,
                error_prod_text: "",
                cod_lista_curso: 0,
                search: '',
                productos:[{
                }],
                compra:[{
                }],
                favoritos:[{
                }]
            }
        },
        props:{
            tipo: 0,
            despensa:0
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
        },
        mounted(){
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
</style>