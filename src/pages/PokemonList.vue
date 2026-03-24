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
        
        <h5 class="q-ml-sm text-weight-bold text-dark">Mis Pokémon</h5>

        <div class="row q-col-gutter-y-sm">
          
          <div 
            class="col-12" 
            v-for="(pokemon, index) in pokemons" 
            :key="pokemon.id || index"
          >
            <q-card class="my-card hover-shadow" v-ripple>
              
              <div class="row items-center no-wrap q-pa-sm">
                
                <div class="col-auto">
                  <q-avatar size="60px" square class="bg-primary text-white rounded-borders text-h5 text-weight-bold">
                    {{ pokemon.name ? pokemon.name.charAt(0).toUpperCase() : '?' }}
                  </q-avatar>
                </div>

                <div class="col q-ml-md">
                  <div class="text-subtitle1 text-weight-bold text-dark q-ma-none leading-none">
                    {{ pokemon.name }}
                  </div>
                  <div class="text-caption text-grey-7">Generación {{ pokemon.generation }}</div>
                </div>

                <div class="col-auto q-mr-sm">
                  <q-chip color="secondary" text-color="white" size="sm" dense>
                    {{ pokemon.type }}
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

        <div v-if="pokemons.length === 0" class="text-center q-mt-xl text-grey-6">
          <q-icon name="pets" size="4xl" class="q-mb-sm" />
          <p>Aún no tienes ningún Pokémon. ¡Añade el primero!</p>
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
  $q.loading.show({ message: 'Cargando tu Pokédex...' });

  try {
    // Usamos la ruta relativa gracias al proxy de Quasar
    const response = await fetch('/api/pokemons', {
      method: 'GET',
      credentials: 'include', // Imprescindible para la sesión
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    pokemons.value = data;

  } catch (error) {
    console.error('Error:', error);
    $q.notify({ type: 'negative', message: 'Fallo al cargar la lista de Pokémon' });
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