<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" to="/pokemonList" />
        <q-toolbar-title>Añadir Nuevo Pokémon</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center bg-grey-2 q-pa-md">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 400px;">
          
          <div class="text-h5 text-weight-bold text-center q-mb-md text-primary">
            Datos del Pokémon
          </div>

          <q-form @submit.prevent="crearPokemon" class="q-gutter-md">
            <q-input 
              outlined 
              v-model="newPokemon.name" 
              label="Nombre" 
              lazy-rules
              :rules="[val => !!val || 'El nombre es obligatorio']"
            >
              <template v-slot:prepend>
                <q-icon name="pets" />
              </template>
            </q-input>

            <q-input 
              outlined 
              v-model="newPokemon.type" 
              label="Tipo (ej. Fuego, Agua)"
              :rules="[val => !!val || 'El tipo es obligatorio']"
            >
              <template v-slot:prepend>
                <q-icon name="water_drop" />
              </template>
            </q-input>

            <q-input 
              outlined 
              v-model.number="newPokemon.generation" 
              type="number" 
              label="Generación"
              :rules="[val => val > 0 || 'Debe ser mayor a 0']"
            >
              <template v-slot:prepend>
                <q-icon name="tag" />
              </template>
            </q-input>

            <div class="row q-mt-lg q-gutter-sm">
              <q-btn 
                class="col" 
                color="grey-6" 
                label="Cancelar" 
                to="/pokemonList" 
                unelevated 
              />
              <q-btn 
                class="col" 
                color="primary" 
                label="Guardar" 
                type="submit" 
                unelevated 
              />
            </div>
          </q-form>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

// Estado inicial del nuevo Pokémon
const newPokemon = ref({
  name: '',
  type: '',
  generation: 1
});

const crearPokemon = async () => {
  // Mostramos el spinner de carga
  $q.loading.show({ message: 'Registrando en la Pokédex...' });

  try {
    // Detectar si usamos la IP del móvil o ruta relativa de PC
    const baseUrl = $q.platform.is.capacitor ? 'http://172.23.7.113:3000' : '';
    
    const response = await fetch(`${baseUrl}/api/pokemons`, {
      method: 'POST',
      credentials: 'include', // Importante para enviar la cookie de sesión
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon.value)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear');
    }

    // Notificación de éxito
    $q.notify({
      type: 'positive',
      message: '¡Pokémon capturado con éxito!',
      position: 'top'
    });

    // Redirigir a la lista
    router.push('/pokemonList');

  } catch (error) {
    console.error('Error en POST:', error);
    $q.notify({
      type: 'negative',
      message: 'No se pudo guardar: ' + error.message
    });
  } finally {
    // Escondemos el spinner siempre, falle o no
    $q.loading.hide();
  }
};
</script>

<style scoped>
/* Estilo opcional para que el card se vea un poco más separado en móviles */
.q-card {
  border-radius: 12px;
}
</style>