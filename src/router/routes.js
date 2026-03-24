
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/pokemonList',
    component: () => import('pages/PokemonList.vue'),
  },

  {
    path: '/create',
    component: () => import('pages/CreatePokemon.vue'),
  },

  { 
    path: '/edit/:id', component: () => import('pages/EditPokemon.vue') 
  },

  { 
    path: '/delete/:id', component: () => import('pages/DeletePokemon.vue') 
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

]

export default routes
