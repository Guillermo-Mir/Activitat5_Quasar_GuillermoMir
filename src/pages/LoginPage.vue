<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-1 q-pa-md">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 350px;">
          <div class="row q-mb-md">
            <q-btn color="primary" flat size="sm" label="Home" icon="home" to="/" rounded />
          </div>

          <div class="text-h4 text-weight-bold text-center q-mb-lg text-primary">Login</div>

          <div class="q-gutter-md">
            <q-input outlined v-model="email" type="email" label="Email">
              <template v-slot:prepend><q-icon name="email" /></template>
            </q-input>

            <q-input outlined v-model="password" type="password" label="Contraseña" @keyup.enter="iniciarSesion">
              <template v-slot:prepend><q-icon name="lock" /></template>
            </q-input>

            <q-btn color="dark" size="lg" class="full-width q-mt-md" label="Entrar" @click="iniciarSesion" rounded unelevated />

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
import { api } from 'src/boot/axios'; 

const email = ref('');
const password = ref('');
const router = useRouter();
const $q = useQuasar();

const iniciarSesion = async () => {
  // 1. Validación básica
  if (!email.value || !password.value) {
    $q.notify({ type: 'warning', message: 'Falten camps per introduir' });
    return;
  }

  $q.loading.show({ message: 'Validant credencials...' });

  try {
    // 2. Petición al backend (Ruta sin /api según tu estructura de routes/auth/login.ts)
    const response = await api.post('/auth/login', {
      email: email.value.trim(),
      password: password.value.trim()
    });

    // 3. GUARDAR EL TOKEN EN EL MÓVIL/NAVEGADOR
    // Verificamos que el backend realmente envió el token
    if (response.data && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      console.log('Token guardado correctamente:', response.data.token);
    } else {
      console.warn('El backend no devolvió un token en la respuesta');
    }

    $q.notify({ 
      type: 'positive', 
      message: '¡Login correcte!',
      timeout: 1000 
    });
    
    // 4. NAVEGACIÓN A LA LISTA
    // Usamos await para asegurar que la navegación se procese
    await router.push('/pokemonList');

  } catch (error) {
    console.error('Error detallado en el login:', error);
    
    // Si es un 404, revisa si la ruta en Nuxt es /auth/login o /api/auth/login
    if (error.response?.status === 404) {
      $q.notify({ type: 'negative', message: 'Error 404: Ruta no trobada al servidor' });
    } else {
      const mensajeError = error.response?.data?.message || error.response?.data?.statusMessage || 'Error en les credencials';
      $q.notify({ type: 'negative', message: mensajeError });
    }
  } finally {
    $q.loading.hide();
  }
}
</script>