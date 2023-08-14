<template>
    <div v-if="dialog===false">
        <div class="padd" v-for="lista in listas" :key="lista.cod_lista">
            <div class="div_btn" v-if="lista.estado!='En curso'" 
            @click="verCompra(lista.cod_lista,lista.nombre)">
                {{ lista.nombre }}
                <v-badge dot inline color="red" v-if="lista.estado==='Pendiente'"></v-badge>
                <span class="almac_text" v-if="lista.estado==='Pendiente'">{{textPorAlmac}}</span>
                <v-badge dot inline color="green" v-if="lista.estado==='Almacenada'"></v-badge>
                <span class="almac_text" v-if="lista.estado==='Almacenada'">{{textAlmac}}</span>
            </div>
        </div>
    </div>
    <div v-else>
        <anteriores-tabla 
        :cod_lista="cod_lista"
        :titulo="nom_lista"
        @closeDialog = "closeDialog()"></anteriores-tabla>
    </div>
</template>

<script>
import axios from 'axios'
import AnterioresTabla from '../components/AnterioresTabla.vue';
    export default {
        data(){
            return{
                listas: [{}],
                anteriores: [{}],
                error_carga: false,
                error_carga_text: "",
                ver_anteriores: false,
                dialog: false,
                cod_lista: null,
                nom_lista: "",
                textPorAlmac: "",
                idioma: "",
                textAlmac: ""
            }
        },
        components:{
            AnterioresTabla
        },
        methods:{
            async cargarListas(){
                await axios.get('lista_compra')
                .then((respuesta) =>{
                    this.listas = respuesta.data
                    this.anteriores = this.listas.filter(function (lista) {
                                return (lista.estado!="En curso")
                            });
                })
                .catch(error => {
                    if (error.response.status != 0){
                        this.error_carga_text = "Se ha producido un error"
                        this.error_carga = true
                    }
                })
            },
            verCompra(lista,nom_lista){
                this.cod_lista = lista
                this.nom_lista = nom_lista
                this.dialog = true
            },
            closeDialog(){
                this.dialog = false
            },
            cargarTextos(){
                if(this.idioma === 'SPA'){
                    this.textPorAlmac = 'Pendiente de almacenar'
                    this.textAlmac = 'Almacenada'
                }else{
                    this.textPorAlmac = 'Pending to store'
                    this.textAlmac = 'Stored'
                }
            }
        },
        mounted(){
            this.idioma = localStorage.getItem('idioma')
            this.cargarTextos()
            this.cargarListas()
        }    
    }
</script>

<style lang="scss" scoped>
    .div_btn{
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
</style>