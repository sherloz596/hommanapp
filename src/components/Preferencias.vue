<template>
<div class="preferencias" v-if="dialog===false">
        <v-btn class="btn" block @click="dialogProductos"> Productos</v-btn>
        <v-btn class="btn" block @click="dialogUnidades"> Unidades</v-btn>     
    </div>
    <dialogo-ver 
        :data_dialog="data_dialog"
        :titulo = "data_dialog_tit"
        v-if="dialog===true"
        @closeDialog="closeDialog"></dialogo-ver> 
</template>

<script>
import DialogoVer from '../components/DialogoVer.vue';
    export default {
        data(){
            return{
                dialog: false,
                data_dialog: "",
                data_dialog_tit: ""
            }
        },
        components:{
            DialogoVer
        },
        methods:{
            dialogProductos(){
                this.data_dialog = "productos"
                this.data_dialog_tit = "Lista de productos"
                this.dialog = true
            },
            dialogUnidades(){
                this.data_dialog = "unidades"
                this.data_dialog_tit = "Lista de unidades"
                this.dialog = true
            },
            closeDialog(){
                this.dialog = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .preferencias{
        padding: 10px;
        padding-right: 30px;
    }
    .btn{
        color: #EEEEEE;
        background-color: #810281;
        margin: 10px;
    }
</style>