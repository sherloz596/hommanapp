<template>
    <div v-if="dialog===false">
        <div class="padd" v-for="lista in listas" :key="lista.cod_lista">
            <div class="div_btn" v-if="lista.estado!='En curso'" 
            @click="verCompra(lista.cod_lista,lista.nombre)">
                {{ lista.nombre }}
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
                nom_lista: ""
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
                    // if(this.listas_pendientes[0]===undefined){
                    //     this.hay_pendientes = false
                    // }else{
                    //     this.num_pendientes = this.listas_pendientes.length
                    //     this.hay_pendientes = true
                    // }
                })
                .catch(error => {
                    console.log(error)
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
            }
        },
        mounted(){
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
</style>