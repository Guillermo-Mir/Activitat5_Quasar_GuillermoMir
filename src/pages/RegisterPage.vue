<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>

            <q-page class="flex flex-center bg-grey-1 q-pa-md">
                <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 350px;">

                    <div class="row q-mb-md">
                        <q-btn color="primary" flat size="sm" label="Home" icon="home" to="/" rounded />
                    </div>

                    <div class="text-h4 text-weight-bold text-center q-mb-lg text-primary">
                        Registro
                    </div>

                    <div class="q-gutter-md">

                        <q-input outlined v-model="nom" type="text" label="Nombre">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input outlined v-model="email" type="email" label="Email">
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>

                        <q-input outlined v-model="password" type="password" label="Contraseña">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <q-btn color="secondary" size="lg" class="full-width q-mt-md" label="Registrarse"
                            @click="registrar" rounded unelevated />

                        <div class="text-center q-mt-sm">
                            <q-btn flat color="primary" label="Ya tengo cuenta" to="/login" size="sm" />
                        </div>

                    </div>

                </q-card>
            </q-page>

        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const nom = ref('')
const email = ref('')
const password = ref('')


const registrar = () => {
    console.log('Datos de registro:', nom.value, email.value, password.value)
    
}
</script>