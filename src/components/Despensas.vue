<template>
    <v-alert v-if = "err_despensas"
                density="compact"
                type="error"
                variant="tonal"
                closable
                :text="err_despensas_text"
                ></v-alert>
    <div class="despensas" v-if="dialog === false & dialog_add === false & hay_despensas ===true">
        <v-btn class="btn" block
        
        v-for="despensa in despensas"
        :key="despensa.id" @click="mostrar(despensa)">
        <span v-if="idioma === 'SPA'">{{ despensa.despensa }}</span>
        <span v-else>{{ despensa.idioma }}</span>
        </v-btn>      
    <v-btn class="add_btn" density="default"  icon="mdi-plus" @click="add_despensa"></v-btn>
    </div>
    <!-- Cuadro diálogo para mostrar productos -->
    <v-fade-transition hide-on-leave>
        <v-card
          v-if="dialog & del_dialog === false"
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <font-awesome-icon class="edit_icon"  icon="fa-solid fa-pen" size = "xs"
            @click="editDespensa()"/>
            <font-awesome-icon class="del_icon" icon="fa-solid fa-trash-can" size = "xs"
            @click="delDespensa()"/>
            <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
          </template>
          <despensas-tabla :cod_despensa="ver_despensa" ref="despensasTabla" ></despensas-tabla>
          <div v-if="add_alma">
            <v-divider class="border-opacity-75" 
            :thickness="3"
            style="margin-top: 20px;margin-bottom: 20px;"></v-divider>
            <span><h3>{{almaNuevo}}</h3></span>
            <!-- v-model="producto[producto.cod_producto]" -->
            <v-select
              v-model="producto"
              :items="productos"
              :label="almaProducto"
              :item-title="almaSelectProducto"
              item-value="cod_producto"
            ></v-select>
            <v-text-field
                :label="almaCantidad"
                v-model="cantidad"
                hide-details
                single-line
                compact
                type="number"
                style="margin-bottom: 22px;"/>
            <v-select
              v-model="unit"
              :items="unidades"
              :label="almaUnidad"
              :item-title="almaSelectUnidad"
              item-value="cod_unidad"
            ></v-select>
            <v-btn @click="almaOk" style="margin-right: 40px;">{{almaOkText}}</v-btn>
            <v-btn @click="cancelAlma">{{almaCancel}}</v-btn>
          </div>
          <div class="pa-4 text-end">
            <v-btn
              v-if="!add_alma"
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="add_alma = true"
            >
              {{text_almac}}
            </v-btn>
            <v-btn
              v-if="!add_alma"
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="dialog = false"
            >
              {{almaCerrar}}
            </v-btn>
          </div>
        </v-card>
        <v-dialog
        v-model="del_dialog"
        persistent
        width="auto"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{delTittle}}
          </v-card-title>
          <v-card-text>{{deltext}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="del_dialog = false"
            >
              {{delCancel}}
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="del_ok"
            >
              {{delOk}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-fade-transition>
          <!-- Cuadro diálogo para añadir -->
    <v-fade-transition hide-on-leave v-if="dialog_add">
        <añadir @cerrar_add="close_add" 
            :origen="origen" 
            :item="item"
             @reload="recargar"></añadir>
        
      </v-fade-transition>
</template>

<script>
import axios from 'axios'
import DespensasTabla from '../components/DespensasTabla.vue';
import Añadir from '../components/Añadir.vue';
    export default {
        name: 'despensas',
        data(){
            return{
                despensas:[{
                    id:"",
                }],
                dialog:false,
                titulo:"",
                dialog_add:false,
                nom_despensa: "",
                error_nombre: "",
                err_nom_text: "",
                hay_despensas: false,
                err_despensas: "",
                err_despensas_text: "",
                ver_despensa: 0,
                text_almac: "",
                deltext: "",
                delCancel: "",
                delOk: "",
                delTittle: "",
                almaCerrar: "",
                almaNuevo: "",
                almaOkText: "",
                almaCancel: "",
                almaCantidad:"",
                almaProducto: "",
                almaUnidad: "",
                almaSelectProducto: "",
                almaSelectUnidad: "",
                del_dialog: false,
                eliminar: null,
                idioma: "",
                origen: "",
                despensa_sel: {},
                productos:[{}],
                producto:[],
                unidades: [{}],
                unit:[],
                cantidad: null,
                add_alma: false,
                rules: {
                    required: value => !!value || "Obligatorio",
                    max: v => (v && v.length <= 20) || "Máximo 20 caracteres"
                }
            }
        },
        components:{
            DespensasTabla,
            Añadir
        },
        methods:{
            async cargarDespensas(){
                await axios.get('despensas')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.despensas = respuesta.data
                    }
                    if(this.despensas[0].cod_despensa===undefined){
                        this.hay_despensas = false
                    }else{
                        this.hay_despensas = true
                    }
                
                })
                .catch(error => {
                    if (error.response.status != 0){
                        // location.reload()
                        this.err_despensas_text = "Se ha producido un error"
                        this.err_despensas = true
                    }
                })
            },
            mostrar(despensa){
                this.despensa_sel = despensa
                if (this.idioma === 'SPA'){
                    this.titulo = despensa.despensa
                }else{
                    this.titulo = despensa.idioma
                }
                this.ver_despensa = despensa.cod_despensa
                this.dialog = !this.dialog
            },
            close_add(){
                this.dialog = !this.dialog
                this.dialog_add = false
                this.error_nombre = false
            },
            add_despensa(){
                this.origen = "despensas"
                this.dialog_add = !this.dialog_add
            },
            recargar(){
                // this.cargarDespensas()
                location.reload()
            },
            delDespensa(){
                this.del_dialog = true
                this.eliminar = this.ver_despensa
            },
            async del_ok(){
                await axios.delete('despensas/'+this.eliminar)
                .catch(error => {
                      if (error.response.status != 0){
                          this.error_prod_text = "Se ha producido un error"
                          this.error_prod = true
                      }
                  })
                  this.del_dialog = false
                  this.dialog = false
                  this.cargarDespensas()
            },
            editDespensa(){
                this.dialog = false
                this.origen = "edit_despensa"
                this.item = this.despensa_sel
                this.dialog_add = true
            },
            async cargarProductos(){
                await axios.get('productos')
                .then ((respuesta) =>{
                    if(respuesta.status === 200){
                        this.productos = respuesta.data
                    }
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_prod_text = "Se ha producido un error"
                        this.error_prod = true
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
            cancelAlma(){
              this.add_alma = false
              this.producto = []
              this.cantidad = []
              this.unit = []
            },
            async almaOk(){
                if (this.producto != "" & this.unit != "" & this.cantidad > 0){
                    let payload = {
                        cod_producto: this.producto,
                        cod_despensa: this.ver_despensa,
                        cod_unidad: this.unit,
                        cantidad: this.cantidad
                    }
                    await axios.post('almacenajes',payload)
                    .then ((respuesta) =>{
                        if (respuesta.data!= undefined){
                          this.producto = []
                          this.cantidad = []
                          this.unit = []
                          this.$refs.despensasTabla.cargarProductos()
                          this.add_alma = false

                        }
                    })
                    .catch(error => {
                        if (error){
                            if (error.response.status != 0){
                                console.log(error.response)
                                this.error_carga_text = "Se ha producido un error"
                                this.error_carga = true
                            }
                        }
                    })
                }
            },
            cargarTextos(){
                if(this.idioma === 'SPA'){
                    this.text_almac = "Almacenar"
                    this.delTittle = "Eliminar"
                    this.deltext = '¿Está seguro de eliminar la despensa?'
                    this.delCancel = 'Cancelar'
                    this.delOk = 'Aceptar'
                    this.almaCerrar = 'Cerrar'
                    this.almaNuevo = 'Nuevo almacenaje'
                    this.almaOkText = 'Aceptar'
                    this.almaCancel = 'Cancelar'
                    this.almaCantidad = 'Cantidad'
                    this.almaProducto = 'Producto'
                    this.almaUnidad = 'Unidad'
                    this.almaSelectProducto = "producto"
                    this.almaSelectUnidad = "unidad"
                }else{
                    this.text_almac = "Store"
                    this.delTittle = "Delete"
                    this.deltext = 'Are you sure to delete the pantry?'
                    this.delCancel = 'Cancel'
                    this.delOk = 'Ok'
                    this.almaCerrar = 'Close'
                    this.almaNuevo = 'New storage'
                    this.almaOkText = 'Ok'
                    this.almaCancel = 'Cancel'
                    this.almaCantidad = 'Quantity'
                    this.almaProducto = 'Product'
                    this.almaUnidad = 'Unit'
                    this.almaSelectProducto = "idioma"
                    this.almaSelectUnidad = "idioma"
                }
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
            this.cargarTextos()
            this.cargarDespensas()
            this.cargarProductos()
            this.cargaUnidades()
            if(this.idioma === 'SPA'){
            }else{

            }
        } 
    }
</script>

<style lang="scss" scoped>
    .despensas{
        padding: 10px;
        padding-right: 30px;
    }
    .btn{
        color: #EEEEEE;
        background-color: #810281;
        margin: 10px;
    }
    .add_btn{
        position: fixed;
        bottom: 12%;
        right: 15%;
        color: #EEEEEE;
        background-color: #810281;
    }
    .edit_icon{
        margin-right: 15px;
        cursor: pointer;
    }
    .del_icon{
        color: red;
        margin-right: 15px;
        cursor: pointer;
    }
</style>