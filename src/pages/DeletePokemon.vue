<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-negative text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" to="/pokemonList" />
        <q-toolbar-title>Eliminar Pokémon</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center bg-grey-2 q-pa-md">
        <q-card class="q-pa-lg shadow-2 rounded-borders text-center" style="width: 100%; max-width: 400px;">
          
          <q-icon name="warning" color="negative" size="4rem" class="q-mb-md" />
          <div class="text-h5 text-weight-bold q-mb-sm">¿Estás seguro?</div>
          
          <p class="text-body1 q-mb-lg text-grey-8">
            Estás a punto de eliminar a <span class="text-weight-bold text-dark">{{ nombrePokemon }}</span> de tu Pokédex. Esta acción no se puede deshacer.
          </p>

          <div class="row q-gutter-sm">
            <q-btn class="col" color="grey-6" label="Cancelar" to="/pokemonList" unelevated />
            <q-btn class="col" color="negative" label="Eliminar" @click="eliminarPokemon" unelevated />
          </div>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const nombrePokemon = ref('este Pokémon');

// Función auxiliar para la URL base (IP para móvil, vacía para PC)
const getBaseUrl = () => $q.platform.is.capacitor ? 'http://172.23.7.113:3000' : '';

const cargarNombrePokemon = async () => {
  try {
    // 🔥 CAMBIO: Usamos ?id= en lugar de /id
    const response = await fetch(`${getBaseUrl()}/api/pokemons?id=${route.params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      // Si el backend devuelve un array, tomamos el primero, si no, el objeto directo
      const pokemonData = Array.isArray(data) ? data[0] : data;
      nombrePokemon.value = pokemonData.name; 
    }
  } catch (error) {
    console.error('Error al cargar nombre:', error);
  }
};

const eliminarPokemon = async () => {
  $q.loading.show({ message: 'Eliminando...' });

  try {
    // 🔥 CAMBIO: Usamos ?id= en lugar de /id
    const response = await fetch(`${getBaseUrl()}/api/pokemons?id=${route.params.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('Error al eliminar');

    $q.notify({ type: 'positive', message: 'Pokémon eliminado' });
    router.push('/pokemonList'); 
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Hubo un error al eliminar' });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  cargarNombrePokemon();
});
</script>