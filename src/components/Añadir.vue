<template>
    <div>
        <v-card
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="close_add"></v-btn>
          </template>
          <v-text-field v-model="nombre" :rules="[rules.required, rules.max]" 
          :label="etiqueta" maxlength="20" required></v-text-field>
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
              {{aceptar}}
            </v-btn>
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="close_add"
            >
              {{cancelar}}
            </v-btn>
          </div>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        data(){
            return{
                nombre: "",
                error_nombre: "",
                err_nom_text: "",
                titulo: "",
                aceptar: "",
                cancelar: "",
                etiqueta: "",
                despensas: [{}],
                productos:[{}],
                unidades:[{}],
                idioma:"",
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        props:{
            origen: '',
            // comparar: [{}],
            // cod_item: null,
            // nom_item: '',
            // nom_idioma: '',
            item: {}
        },
        methods:{
            close_add(){
                // this.dialog_add = false
                this.error_nombre = false
                this.$emit("cerrar_add")
            },
            add_ok(){
                switch (this.origen){
                    case "despensas":
                        this.add_despensa()
                        break
                    case "productos":
                        this.add_producto()
                        break
                    case "unidades":
                        this.add_unidad()
                        break
                    case "edit_despensa":
                        this.editDespensa()
                        break
                    case "edit_prod":
                        this.editProd()
                        break
                    case "edit_unit":
                        this.editUnit()
                        break
                }
            },
            async add_despensa(){
                var nom_despensa = this.nombre.trim()
                var coincide = false
                for (var i = 0;i<this.despensas.length;i++){
                    if (this.idioma === 'SPA'){
                        if (nom_despensa.toLocaleUpperCase() === this.despensas[i].despensa.toLocaleUpperCase()){
                            coincide = true
                            break
                        }
                    }else{
                        if (nom_despensa.toLocaleUpperCase() === this.despensas[i].idioma.toLocaleUpperCase()){
                            coincide = true
                            break
                        }                       
                    }
                }
                
                if (nom_despensa != null & nom_despensa != "" & nom_despensa.length <= 20 
                & coincide === false){
                    var data = {
                    despensa: nom_despensa,
                    idioma: nom_despensa
                    }
                    await axios.post('despensas',data)
                    .then (respuesta =>{
                    if (respuesta.data.despensa === nom_despensa){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     console.log(error.response.status);
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
            },
            async add_producto(){
                var nom_producto = this.nombre.trim()
                var coincide = false
                for (var i = 0;i<this.productos.length;i++){
                    if (this.idioma === 'SPA'){
                        if (nom_producto.toLocaleUpperCase() === this.productos[i].producto.toLocaleUpperCase()){
                            coincide = true
                            break
                        }
                    }else{
                        if (nom_producto.toLocaleUpperCase() === this.productos[i].idioma.toLocaleUpperCase()){
                            coincide = true
                            break
                        }                       
                    }
                }
                
                if (nom_producto != null & nom_producto != "" & nom_producto.length <= 20 
                & coincide === false){
                    var data = {
                    producto: nom_producto,
                    idioma: nom_producto
                    }
                    await axios.post('productos',data)
                    .then (respuesta =>{
                    if (respuesta.data.producto === nom_producto){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     console.log(error.response.status);
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
            },
            async add_unidad(){
                var nom_unidad = this.nombre.trim()
                var coincide = false
                for (var i = 0;i<this.unidades.length;i++){
                    if (this.idioma === 'SPA'){
                        if (nom_unidad.toLocaleUpperCase() === this.unidades[i].unidad.toLocaleUpperCase()){
                            coincide = true
                            break
                        }
                    }else{
                        if (nom_unidad.toLocaleUpperCase() === this.unidades[i].idioma.toLocaleUpperCase()){
                            coincide = true
                            break
                        }                       
                    }
                }
                
                if (nom_unidad != null & nom_unidad != "" & nom_unidad.length <= 20 
                & coincide === false){
                    var data = {
                    unidad: nom_unidad,
                    idioma: nom_unidad
                    }
                    await axios.post('units',data)
                    .then (respuesta =>{
                    if (respuesta.data.unidad === nom_unidad){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     console.log(error.response.status);
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
            },
            async editDespensa(){
                console.log("CHECK")
                var nom_despensa = this.nombre.trim()
                var coincide = false
                if ((this.idioma === 'SPA' & nom_despensa != this.item.despensa) 
                | (this.idioma === 'ENG' & nom_despensa != this.item.idioma)){
                    for (var i = 0;i<this.despensas.length;i++){
                        if (this.idioma === 'SPA'){
                            if (nom_despensa.toLocaleUpperCase() === this.despensas[i].despensa.toLocaleUpperCase()){
                                coincide = true
                                break
                            }
                        }else{
                            if (nom_despensa.toLocaleUpperCase() === this.despensas[i].idioma.toLocaleUpperCase()){
                                coincide = true
                                break
                            }                       
                        }
                    }
                    if (nom_despensa != null & nom_despensa != "" & nom_despensa.length <= 20 
                & coincide === false){
                    var data = {
                    despensa: nom_despensa,
                    idioma: nom_despensa,
                    }
                    await axios.put('despensas/' + this.item.cod_despensa,data)
                    .then (respuesta =>{
                    if (respuesta.data.despensa === nom_despensa){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
                }
            },
            async editProd(){
                var nom_producto = this.nombre.trim()
                var coincide = false
                if ((this.idioma === 'SPA' & nom_producto != this.item.producto) 
                | (this.idioma === 'ENG' & nom_producto != this.item.idioma)){
                    for (var i = 0;i<this.productos.length;i++){
                        if (this.idioma === 'SPA'){
                            if (nom_producto.toLocaleUpperCase() === this.productos[i].producto.toLocaleUpperCase()){
                                coincide = true
                                break
                            }
                        }else{
                            if (nom_producto.toLocaleUpperCase() === this.productos[i].idioma.toLocaleUpperCase()){
                                coincide = true
                                break
                            }                       
                        }
                    }
                    console.log("nombre: "+nom_producto)
                    console.log("idioma: "+nom_producto)
                    if (nom_producto != null & nom_producto != "" & nom_producto.length <= 20 
                & coincide === false){
                    console.log("nombre: "+nom_producto)
                    console.log("idioma: "+nom_producto)
                    var data = {
                    producto: nom_producto,
                    idioma: nom_producto,
                    comprar: this.item.comprar,
                    favorito: this.item.favorito
                    }
                    await axios.put('productos/' + this.item.cod_producto,data)
                    .then (respuesta =>{
                    if (respuesta.data.producto === nom_producto){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
                }
            },
            async editUnit(){
                var nom_unidad = this.nombre.trim()
                var coincide = false
                if ((this.idioma === 'SPA' & nom_unidad != this.item.unidad) 
                | (this.idioma === 'ENG' & nom_unidad != this.item.idioma)){
                    for (var i = 0;i<this.unidades.length;i++){
                        if (this.idioma === 'SPA'){
                            if (nom_unidad.toLocaleUpperCase() === this.unidades[i].unidad.toLocaleUpperCase()){
                                coincide = true
                                break
                            }
                        }else{
                            if (nom_unidad.toLocaleUpperCase() === this.unidades[i].idioma.toLocaleUpperCase()){
                                coincide = true
                                break
                            }                       
                        }
                    }
                if (nom_unidad != null & nom_unidad != "" & nom_unidad.length <= 20 
                & coincide === false){
                    var data = {
                    unidad: nom_unidad,
                    idioma: nom_unidad,
                    }
                    await axios.put('units/' + this.item.cod_unidad,data)
                    .then (respuesta =>{
                    if (respuesta.data.unidad === nom_unidad){
                        this.$emit('reload')
                        this.close_add()
                    }
                })
                .catch(error => {
                    console.log(error)
                     if (error.response.status === 401){
                        this.err_nom_text = "Se ha producido un error"
                        this.error_nombre = true
                     }
                })
                }else{
                    if (coincide){
                        this.err_nom_text = "El nombre ya está en uso"
                        this.error_nombre = true
                    }else{
                        this.err_nom_text = "Nombre no válido"
                        this.error_nombre = true
                    }
                }
                }
            },
            cargarTextos(){
                this.idioma = localStorage.getItem('idioma')
                if (this.idioma === 'SPA'){
                    this.aceptar = "Aceptar"
                    this.cancelar = "Cancelar"
                }else{
                    this.aceptar = "Ok"
                    this.cancelar = "Cancel"
                }
                switch (this.origen){
                    case "despensas":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Nueva despensa"
                            this.etiqueta = "Despensa"
                        }else{
                            this.titulo = "New pastry"
                            this.etiqueta = "Pastry"
                        }
                        break
                    case "productos":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Nuevo producto"
                            this.etiqueta = "Producto"                       
                        }else{
                            this.titulo = "New product"
                            this.etiqueta = "Product"    
                        }
                        break
                    case "unidades":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Nueva unidad"
                            this.etiqueta = "Unidad"
                        }else{
                            this.titulo = "New unit"
                            this.etiqueta = "Unit"  
                        }
                        break 
                    case "edit_despensa":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Editar despensa"
                            this.etiqueta = "Despensa"
                            this.nombre = this.item.despensa

                        }else{
                            this.titulo = "Edit pantry"
                            this.etiqueta = "Pantry" 
                            this.nombre = this.item.idioma
                        }
                        break    
                    case "edit_prod":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Editar producto"
                            this.etiqueta = "Producto"
                            this.nombre = this.item.producto

                        }else{
                            this.titulo = "Edit product"
                            this.etiqueta = "Product" 
                            this.nombre = this.item.idioma
                        }
                        break
                    case "edit_unit":
                        if (this.idioma === 'SPA'){
                            this.titulo = "Editar unidad"
                            this.etiqueta = "Unidad"
                            this.nombre = this.item.unidad

                        }else{
                            this.titulo = "Edit unit"
                            this.etiqueta = "Unit" 
                            this.nombre = this.item.idioma
                        }
                        break
                }
                
                // if (this.origen === "despensas")
                //     if (this.idioma === 'SPA'){
                //         this.titulo = "Nueva despensa"
                //         this.etiqueta = "Despensa"
                //     }else{
                //         this.titulo = "New pastry"
                //         this.etiqueta = "Pastry"
                //     }

                // if (this.origen === "productos"){
                //     if (this.idioma === 'SPA'){
                //         this.titulo = "Nuevo producto"
                //         this.etiqueta = "Producto"                       
                //     }else{
                //         this.titulo = "New product"
                //         this.etiqueta = "Product"    
                //     }
                // }
                // if (this.origen === "unidades"){
                //     if (this.idioma === 'SPA'){
                //         this.titulo = "Nueva unidad"
                //         this.etiqueta = "Unidad"
                //     }else{
                //         this.titulo = "New unit"
                //         this.etiqueta = "Unit"  
                //     }
                // }
            },
            async cargarProductos(){
                await axios.get('productos')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                    }
                })
                .catch(error => {
                })
            },
            async cargarUnidades(){
                await axios.get('units')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.unidades = respuesta.data
                    }
                })
                .catch(error => {
                })
            },
            async cargarDespensas(){
                await axios.get('despensas')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.despensas = respuesta.data
                    }
                })
                .catch(error => {
                })
            },
            cargarDatos(){
                switch (this.origen){
                    case "despensas":
                        this.cargarDespensas()
                        break
                    case "productos":
                        this.cargarProductos()
                        break
                    case "unidades":
                        this.cargarUnidades()
                        break
                    case "edit_despensa":
                        this.cargarDespensas()
                        break
                    case "edit_prod":
                        this.cargarProductos()
                        break
                    case "edit_unit":
                        this.cargarUnidades()
                        break
                }
            }
        },
        mounted() {
            this.cargarTextos()
            this.cargarDatos()
        },
    }
</script>

<style lang="scss" scoped>

</style>