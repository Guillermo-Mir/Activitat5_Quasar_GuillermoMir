<template>
  <q-layout view="lHh Lpr lFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Mi Pokédex (Lista)</q-toolbar-title>
        
        <q-btn flat round dense icon="add" to="/create" class="q-mr-sm">
          <q-tooltip>Añadir Pokémon</q-tooltip>
        </q-btn>

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
                  <q-btn 
                    flat round dense color="primary" icon="edit" class="q-mr-xs"
                    :to="`/edit/${pokemon.id}`"
                  />
                  <q-btn 
                    flat round dense color="negative" icon="delete"
                    :to="`/delete/${pokemon.id}`"
                  />
                </div>

              </div>
            </q-card>
          </div>
        </div>

        <div v-if="pokemons.length === 0" class="text-center q-mt-xl text-grey-6">
          <q-icon name="pets" size="4rem" class="q-mb-sm" />
          <p>Aún no tienes ningún Pokémon. ¡Añade el primero!</p>
          <q-btn color="primary" outline label="Añadir ahora" to="/create" icon="add" />
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="primary" to="/create" />
        </q-page-sticky>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const pokemons = ref([]);

const obtenerPokemons = async () => {
  $q.loading.show({ message: 'Cargando tu Pokédex...' });

  try {
    // Detectamos si es capacitor para usar la IP o ruta relativa
    const baseUrl = $q.platform.is.capacitor ? 'http://172.23.7.113:3000' : '';

    const response = await fetch(`${baseUrl}/api/pokemons`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    pokemons.value = data;

  } catch (error) {
    console.error('Error:', error);
    $q.notify({ type: 'negative', message: 'Fallo al cargar la lista' });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  obtenerPokemons();
});
</script>

<style scoped>
.hover-shadow { transition: box-shadow 0.3s ease-in-out; }
.hover-shadow:hover { box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important; }
.leading-none { line-height: 1.2; }
</style>