<template>
  <q-layout view="lHh Lpr lFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Mi Pokédex (Lista)</q-toolbar-title>
        <q-btn flat round dense icon="logout" to="/login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-sm bg-grey-2">
        
        <h5>PokemonList</h5>

        <div class="row q-col-gutter-y-sm">
          
          <div 
            class="col-12" 
            v-for="(pokemon, index) in pokemons" 
            :key="index"
          >
            <q-card class="my-card hover-shadow" v-ripple>
              
              <div class="row items-center no-wrap q-pa-sm">
                
                <div class="col-auto">
                  <q-avatar size="60px" square class="bg-white rounded-borders">
                    <q-img :src="pokemon.imagen" style="object-fit: contain;" />
                  </q-avatar>
                </div>

                <div class="col q-ml-md">
                  <div class="text-subtitle1 text-weight-bold text-dark q-ma-none leading-none">
                    {{ pokemon.nombre }}
                  </div>
                  <div class="text-caption text-grey-7">Generación {{ pokemon.generacion }}</div>
                </div>

                <div class="col-auto q-mr-sm">
                  <q-chip color="secondary" text-color="white" size="sm" dense>
                    {{ pokemon.tipo }}
                  </q-chip>
                </div>

                <div class="col-auto row no-wrap">
                  <q-btn flat round dense color="primary" icon="edit" class="q-mr-xs" />
                  
                  <q-btn flat round dense color="negative" icon="delete" />
                </div>

              </div>
            </q-card>
          </div>

        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const pokemons = ref([]); // Empezamos con la lista vacía

const obtenerPokemons = async () => {
  // Mostramos un spinner de carga
  $q.loading.show({ message: 'Cargando tu Pokédex...' });

  try {
    // IMPORTANTE: Usa la misma IP que te funcionó en el login
    const response = await fetch('http://172.23.7.113:3000/api/pokemons', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de Pokémon');
    }

    const data = await response.json();
    
    // Asignamos los datos que vienen de Nuxt a nuestra variable reactiva
    // Asegúrate de que Nuxt devuelva un array (o ajusta a data.pokemons si es un objeto)
    pokemons.value = data; 

  } catch (error) {
    console.error('Error al cargar pokemons:', error);
    $q.notify({
      type: 'negative',
      message: 'Error al conectar con la base de datos'
    });
  } finally {
    $q.loading.hide();
  }
};

// Ejecutamos la función automáticamente al entrar en la página
onMounted(() => {
  obtenerPokemons();
});
</script>

<style scoped>
.hover-shadow {
  transition: box-shadow 0.3s ease-in-out;
}
.hover-shadow:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
}
.leading-none {
  line-height: 1.2;
}
</style>