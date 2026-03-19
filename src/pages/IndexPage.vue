<template>
  <q-page class="flex flex-center bg-grey-1 column text-center q-pa-md">

    <div class="q-pa-md">
      <img alt="App logo" src="~assets/logo.png" style="width: 180px; height: auto; max-width: 100%" class="q-mb-md" />

      <h1 class="text-h3 text-weight-bold text-primary q-mt-none q-mb-sm">
        PokéApp
      </h1>
      <p class="text-subtitle1 text-grey-7 q-mb-xl">
        Gestiona el teu equip
      </p>

      <div class="column q-gutter-y-md">

        <q-btn color="primary" outline size="md" label="Iniciar Sesió" to="/login" rounded />

        <q-btn color="primary" outline size="md" label="Registre" to="/register" rounded />
      </div>
    </div>

  </q-page>
</template>