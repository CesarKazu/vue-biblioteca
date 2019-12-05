<template>
  <div id="app" class="container">
    <div id="nav" class="row text-center">
      <router-link to="/livro">Livro</router-link> | 
      <router-link to="/reservar">Reservar</router-link> | 
      <router-link to="/usuario">Usuário</router-link> | 
      <a v-if="usuario" @click="logout">Logout</a> 
      <router-link v-if="!usuario" to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { constants } from 'crypto';

export default {
  name: 'app',
  computed: {
    ...mapState([
      'usuario'
    ])
  },
  methods: {
    ...mapMutations([
      'logout'
    ])
  }
}
</script>
