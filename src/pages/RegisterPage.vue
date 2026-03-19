<template>
    <h1>Registre</h1>
    <q-btn color="primary" outline size="md" label="Home" icon="home" to="/" rounded />
    <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
            <q-input outlined v-model="text" label="nom" />
            <q-input outlined v-model="text" label="email" />
            <q-input outlined v-model="text" label="contrasenya" />
        </div>
    </div>

</template>