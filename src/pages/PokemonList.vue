<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="q-pa-md bg-grey-1">
        
        <div class="row items-center q-mb-md">
          <div class="text-h4 text-primary text-weight-bold">Els meus Pokémon</div>
          <q-space />
          <q-btn color="negative" icon="logout" @click="logout" flat round />
        </div>

        <q-list bordered separator class="bg-white shadow-2 rounded-borders">
          <q-item v-for="pokemon in pokemons" :key="pokemon.id" class="q-py-md">
            <q-item-section avatar>
              <q-avatar size="60px" rounded>
                <img :src="pokemon.image || 'https://via.placeholder.com/150'">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 text-weight-bold">{{ pokemon.name }}</q-item-label>
              <q-item-label caption>Tipus: {{ pokemon.type }} | Gen: {{ pokemon.generation }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row q-gutter-sm">
                <q-btn flat round color="orange" icon="edit" @click="router.push(`/edit/${pokemon.id}`)" />
                <q-btn flat round color="red" icon="delete" @click="confirmarEliminar(pokemon.id)" />
              </div>
            </q-item-section>
          </q-item>

          <q-item v-if="pokemons.length === 0" class="q-pa-xl text-center">
            <q-item-section class="text-grey-6">Encara no tens cap Pokémon.</q-item-section>
          </q-item>
        </q-list>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="primary" @click="router.push('/create')" />
        </q-page-sticky>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const pokemons = ref([]);
const router = useRouter();
const $q = useQuasar();

const cargarPokemons = async () => {
  $q.loading.show();
  try {
    const response = await api.get('/api/pokemons');
    pokemons.value = response.data;
  } catch {
    $q.notify({ type: 'negative', message: 'Error al carregar la llista' });
  } finally {
    $q.loading.hide();
  }
};

const confirmarEliminar = (id) => {
  $q.dialog({
    title: 'Eliminar Pokémon',
    message: 'Estàs segur que vols eliminar-lo?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/api/pokemons?id=${id}`);
      $q.notify({ type: 'positive', message: 'Eliminat correctament' });
      await cargarPokemons();
    } catch {
      $q.notify({ type: 'negative', message: 'No s\'ha pogut eliminar' });
    }
  });
};

const logout = () => {
  localStorage.removeItem('auth_token');
  router.push('/login');
};

onMounted(cargarPokemons);
</script>