import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/livro',
      name: 'livro',
      component: () => import('./views/Livro.vue')
    },
    {
      path: '/contatos',
      name: 'contatos',
      component: () => import('./views/Contatos.vue')
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('./views/Usuario.vue')
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/reservar',
      name: 'reservar',
      component: () => import('./views/Reservar.vue')
    }
  ]
})
