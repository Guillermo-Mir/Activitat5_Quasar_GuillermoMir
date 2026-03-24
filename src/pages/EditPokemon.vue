<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" to="/pokemonList" />
        <q-toolbar-title>Editar Pokémon</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center bg-grey-2 q-pa-md">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 400px;">
          
          <div class="text-h5 text-weight-bold text-center q-mb-md text-primary">Modificar Datos</div>

          <q-form @submit.prevent="guardarCambios" class="q-gutter-md">
            <q-input outlined v-model="pokemon.name" label="Nombre" :rules="[val => !!val || 'El nombre es obligatorio']">
              <template v-slot:prepend><q-icon name="pets" /></template>
            </q-input>

            <q-input outlined v-model="pokemon.type" label="Tipo (ej. Fuego, Agua)">
              <template v-slot:prepend><q-icon name="water_drop" /></template>
            </q-input>

            <q-input outlined v-model.number="pokemon.generation" type="number" label="Generación">
              <template v-slot:prepend><q-icon name="tag" /></template>
            </q-input>

            <div class="row q-mt-lg q-gutter-sm">
              <q-btn class="col" color="grey-6" label="Cancelar" to="/pokemonList" unelevated />
              <q-btn class="col" color="primary" label="Guardar" type="submit" unelevated />
            </div>
          </q-form>

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

const pokemon = ref({ name: '', type: '', generation: 1 });

// Función para obtener la URL base (vacía para PC/Proxy)
const getBaseUrl = () => $q.platform.is.capacitor ? 'http://172.23.7.113:3000' : '';

const cargarPokemon = async () => {
  try {
    // 🔥 CAMBIO CLAVE: Usamos ?id= en lugar de /id
    const response = await fetch(`${getBaseUrl()}/api/pokemons?id=${route.params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('No se pudo cargar el Pokémon');
    
    const data = await response.json();
    // Si tu backend devuelve un array, cogemos el primer elemento
    pokemon.value = Array.isArray(data) ? data[0] : data; 
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Error al cargar los datos' });
    router.push('/pokemonList'); 
  }
};

const guardarCambios = async () => {
  $q.loading.show({ message: 'Guardando cambios...' });

  try {
    // 🔥 CAMBIO CLAVE: También en el PUT usamos ?id=
    const response = await fetch(`${getBaseUrl()}/api/pokemons?id=${route.params.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(pokemon.value)
    });

    if (!response.ok) throw new Error('Error al actualizar');

    $q.notify({ type: 'positive', message: 'Actualizado correctamente' });
    router.push('/pokemonList'); 
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Error al guardar los cambios' });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  cargarPokemon();
});
</script>