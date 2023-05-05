<template>
    <div>
        <v-fade-transition hide-on-leave>
        <v-card
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          width="100%"
          :title="titulo"
        >
          <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="closeDialog"></v-btn>
          </template>
          <!-- <productos
          :despensa="ver_despensa"></productos> -->
          <productos
          v-if="data_dialog==='productos'"
          :tipo=4></productos>
          <unidades v-if="data_dialog==='unidades'"></unidades>
          <anteriores v-if="data_dialog==='compras_anteriores'"></anteriores>
          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="closeDialog"
            >
              Close
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
    </div>
</template>

<script>
import Productos from '../components/Productos.vue';
import Unidades from '../components/Unidades.vue';
import Anteriores from '../components/Anteriores.vue';
    export default {
        props:{
            data_dialog: "",
            titulo: ""
        },
        methods:{
            closeDialog(){
                this.$emit("closeDialog")
            }
        },
        components:{
            Productos,
            Unidades,
            Anteriores
        }
    }
</script>

<style lang="scss" scoped>

</style>