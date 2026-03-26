<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-1 q-pa-md">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 350px;">
          <div class="row q-mb-md">
            <q-btn color="primary" flat size="sm" label="Home" icon="home" to="/" rounded />
          </div>

          <div class="text-h4 text-weight-bold text-center q-mb-lg text-primary">Registro</div>

          <q-form @submit.prevent="registrar" class="q-gutter-md">
            <q-input outlined v-model="nom" type="text" label="Nombre" :rules="[val => !!val || 'El nom és obligatori']">
              <template v-slot:prepend><q-icon name="person" /></template>
            </q-input>

            <q-input outlined v-model="email" type="email" label="Email" :rules="[val => !!val || 'L\'email és obligatori']">
              <template v-slot:prepend><q-icon name="email" /></template>
            </q-input>

            <q-input outlined v-model="password" type="password" label="Contraseña" :rules="[val => !!val || 'La contrasenya és obligatòria']">
              <template v-slot:prepend><q-icon name="lock" /></template>
            </q-input>

            <q-btn color="secondary" size="lg" class="full-width q-mt-md" label="Registrarse" type="submit" rounded unelevated />

            <div class="text-center q-mt-sm">
              <q-btn flat color="primary" label="Ya tengo cuenta" to="/login" size="sm" />
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
import { api } from 'src/boot/axios';

const nom = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const $q = useQuasar();

const registrar = async () => {
  $q.loading.show({ message: 'Creant compte...' });

  try {
    const response = await api.post('/auth/register', {
      name: nom.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    });

    if (response.data && response.data.token) {
      const token = response.data.token;
      localStorage.setItem('auth_token', token);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    $q.notify({ type: 'positive', message: '¡Compte creat correctament!' });
    router.push('/pokemonList');

  } catch (err) {
    console.error('Error en el registro:', err);
    const mensaje = err.response?.data?.statusMessage || 'Error al crear la compte';
    $q.notify({ type: 'negative', message: mensaje });
  } finally {
    $q.loading.hide();
  }
}
</script>