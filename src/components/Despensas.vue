<template>
    <div class="despensas">
        <v-btn class="btn" block
        v-for="despensa in despensas"
        :key="despensa.id">{{ despensa.despensa }}</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'despensas',
        data(){
            return{
                despensas:[{
                    id:"",
                }]
            }
        },
        methods:{
            cargarDespensas:function(){
                axios.get('despensas')
                .then ((respuesta) =>{
                this.despensas = respuesta.data
                })
            }
        },
        mounted(){
            this.cargarDespensas()
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
</style>