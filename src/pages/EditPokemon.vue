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
          <div class="text-h5 text-weight-bold text-center q-mb-md text-primary">Modificar Dades</div>

          <q-form @submit.prevent="guardarCambios" class="q-gutter-md">
            <q-input outlined v-model="pokemon.name" label="Nom" :rules="[val => !!val || 'El nom és obligatori']">
              <template v-slot:prepend><q-icon name="pets" /></template>
            </q-input>

            <q-input outlined v-model="pokemon.type" label="Tipus">
              <template v-slot:prepend><q-icon name="water_drop" /></template>
            </q-input>

            <q-input outlined v-model.number="pokemon.generation" type="number" label="Generació">
              <template v-slot:prepend><q-icon name="tag" /></template>
            </q-input>

            <q-input outlined v-model="pokemon.image" label="URL Imatge">
              <template v-slot:prepend><q-icon name="image" /></template>
            </q-input>

            <div class="row q-mt-lg q-gutter-sm">
              <q-btn class="col" color="grey-6" label="Cancel·lar" to="/pokemonList" flat />
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
import { api } from 'src/boot/axios';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const pokemon = ref({ name: '', type: '', generation: 1, image: '' });

const cargarPokemon = async () => {
  try {
    const response = await api.get(`/api/pokemons?id=${route.params.id}`);
    pokemon.value = response.data;
  } catch {
    $q.notify({ type: 'negative', message: 'Error al carregar les dades' });
    router.push('/pokemonList'); 
  }
};

const guardarCambios = async () => {
  $q.loading.show({ message: 'Guardant canvis...' });
  try {
    await api.put(`/api/pokemons?id=${route.params.id}`, pokemon.value);
    $q.notify({ type: 'positive', message: 'Actualitzat correctament' });
    router.push('/pokemonList'); 
  } catch {
    $q.notify({ type: 'negative', message: 'Error al guardar els canvis' });
  } finally {
    $q.loading.hide();
  }
};

onMounted(cargarPokemon);
</script>