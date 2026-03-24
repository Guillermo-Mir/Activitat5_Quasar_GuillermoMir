<template>
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

        <q-input outlined v-model="password" type="password" label="Contraseña" @keyup.enter="registrar">
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
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const nom = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();

const registrar = async () => {
  // 1. Validamos que los campos no estén vacíos
  if (!nom.value || !email.value || !password.value) {
    $q.notify({ type: 'warning', message: 'Falten camps per introduir' });
    return;
  }

  try {
    // 2. Hacemos la petición POST al backend Nuxt
    const response = await fetch('http://172.23.7.113:3000/auth/register', {
      method: 'POST',
      credentials: 'include', // 🔥 VITAL para guardar la sesión
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nom.value.trim(), // Lo enviamos como "name" para que tu backend lo entienda
        email: email.value.trim(),
        password: password.value.trim()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.statusMessage || data.message || 'Error al crear la compte');
    }

    $q.notify({ type: 'positive', message: '¡Compte creat correctament!' });
    
    router.push('/pokemonList');

  } catch (error) {
    console.error('Error en el registro:', error);
    $q.notify({ 
      type: 'negative', 
      message: error.message || 'Error de connexió al servidor' 
    });
  }
}
</script>