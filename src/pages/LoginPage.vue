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

                        <q-input outlined v-model="password" type="password" label="Contraseña">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <q-btn color="dark" size="lg" class="full-width q-mt-md" label="Entrar" @click="iniciarSesion"
                            rounded unelevated />
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

const email = ref('')
const password = ref('')

const router = useRouter()
const $q = useQuasar()

const iniciarSesion = async () => {
    console.log("Boton pulsado")
    if (!email.value || !password.value) {
        alert('Rellena todos los campos' )
        return
    }

    try {

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })


        if (!response.ok) {
            throw new Error('Credenciales incorrectas')
        }

        const data = await response.json()
        console.log('Usuario logueado:', data)

        $q.notify({ type: 'positive', message: '¡Login correcto!' })


        router.push('/pokemonList')

    } catch (error) {
        console.error('Error en el login:', error)
        $q.notify({ type: 'negative', message: error.message })
    }
}
</script>