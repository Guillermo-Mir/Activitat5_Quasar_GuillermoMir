<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Pokédex App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menú de Navegación </q-item-label>

        <q-item clickable v-ripple to="/pokemonList" exact>
          <q-item-section avatar>
            <q-icon name="pets" /> </q-item-section>
          <q-item-section>
            <q-item-label>Els meus Pokemons</q-item-label>
            <q-item-label caption>Veure i gestionar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/login" exact>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login / Registre</q-item-label>
            <q-item-label caption>Inicia sesió</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view /> 
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>