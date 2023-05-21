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
                etiqueta: "",
                productos:[{}],
                idioma:"",
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        props:{
            origen: '',
            comparar: [{}]
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
                }
            },
            async add_despensa(){
                var nom_despensa = this.nom_despensa.trim()
                var coincide = false

                for (var i = 0;i<this.despensas.length;i++){
                    console.log(nom_despensa.toLocaleUpperCase())
                    if (nom_despensa.toLocaleUpperCase() === this.despensas[i].despensa.toLocaleUpperCase()){
                        coincide = true
                        break
                    }
                }
                if (nom_despensa != null & nom_despensa != "" & nom_despensa.length <= 20 
                & coincide === false){
                    var data = {
                    despensa: this.nom_despensa,
                    idioma: ""
                    }
                    await axios.post('despensas',data)
                    .then (respuesta =>{
                    if (respuesta.data.despensa === nom_despensa){
                        this.cargarDespensas()
                        this.dialog_add = false
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
                    console.log(data)
                    await axios.post('productos',data)
                    .then (respuesta =>{
                    if (respuesta.data.producto === nom_producto){
                        console.log(respuesta)
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
            add_unidad(){
                
            },cargarTextos(){
                this.idioma = localStorage.getItem('idioma')
                if (this.origen === "despensas")
                    if (this.idioma === 'SPA'){
                        this.titulo = "Nueva despensa"
                        this.etiqueta = "Despensa"
                    }else{
                        this.titulo = "New pastry"
                        this.etiqueta = "Pastry"
                    }

                if (this.origen === "productos"){
                    if (this.idioma === 'SPA'){
                        this.titulo = "Nuevo producto"
                        this.etiqueta = "Producto"                       
                    }else{
                        this.titulo = "New product"
                        this.etiqueta = "Product"    
                    }
                }
                if (this.origen === "unidades"){
                    if (this.idioma === 'SPA'){
                        this.titulo = "Nueva unidad"
                        this.etiqueta = "Unidad"
                    }else{
                        this.titulo = "New unit"
                        this.etiqueta = "Unit"  
                    }
                }
            },
            async cargarProductos(){
                await axios.get('productos')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        console.log(respuesta.data)
                        this.productos = respuesta.data
                    }
                })
                .catch(error => {
                })
            },
            cargarDatos(){
                switch (this.origen){
                    case "despensas":
                        this.add_despensa()
                        break
                    case "productos":
                        this.cargarProductos()
                        break
                    case "unidades":
                        this.add_unidad()
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