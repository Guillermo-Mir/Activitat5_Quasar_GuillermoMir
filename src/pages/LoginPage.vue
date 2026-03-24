<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>

            <q-page class="flex flex-center bg-grey-1 q-pa-md">

                <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 350px;">

                    <div class="row q-mb-md">
                        <q-btn color="primary" flat size="sm" label="Home" icon="home" to="/" rounded />
                    </div>

                    <div class="text-h4 text-weight-bold text-center q-mb-lg text-primary">
                        Login
                    </div>

                    <div class="q-gutter-md">
                        <q-input outlined v-model="email" type="email" label="Email">
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>

                        <q-input outlined v-model="password" type="password" label="Contraseña"
                            @keyup.enter="iniciarSesion">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <q-btn color="dark" size="lg" class="full-width q-mt-md" label="Entrar" @click="iniciarSesion"
                            rounded unelevated />

                        <q-btn flat color="primary" class="full-width q-mt-sm" label="Crear compte" to="/register" />
                    </div>

                </q-card>

            </q-page>

        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const email = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();

const iniciarSesion = async () => {
    if (!email.value || !password.value) {
        $q.notify({ type: 'warning', message: 'Falten camps per introduir' });
        return;
    }

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'include', // Lo mantenemos para guardar las cookies de sesión
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value.trim(),
                password: password.value.trim()
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.statusMessage || data.message || 'Error en les credencials');
        }

        $q.notify({ type: 'positive', message: '¡Login correcte!' });

        router.push('/pokemonList');

    } catch (error) {
        console.error('Error en el login:', error);
        $q.notify({
            type: 'negative',
            message: error.message || 'Error de connexió al servidor'
        });
    }
}
</script>