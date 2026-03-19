<template>
    <h1>Login</h1>
    <q-btn color="primary" outline size="md" label="Home" icon="home" to="/" rounded />
    <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
            <q-input outlined v-model="text" label="email" />
            <q-input outlined v-model="text" label="contrasenya" />
        </div>
    </div>
    <q-btn color="dark" outline size="md" label="Entrar" to="/pokemonList" rounded />

</template>