<template>
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <form @submit.prevent="login">
        <div align="center">
          <h2>Login</h2>
        </div>
        <div class="form-group">
          <label for="username">Usuário</label>
          <input type="text" id="username" class="form-control" required autofocus v-model="nome">
        </div>
        <div class="form-group">
          <label for="inputPassword">Senha</label>
          <input type="password" id="inputPassword" class="form-control" required v-model="senha">
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      nome: '',
      senha: ''
    }
  },
  methods: {
    ...mapMutations([
      'setUsuario',
      'setToken'
    ]),
    login() {
      axios.post('login',
          {
            username: this.nome,
            password: this.senha
          })
        .then(res => {
          console.log(res)
          this.setUsuario(res.data)
          this.setToken(res.headers.token)
          this.$router.push('/')
        })
        .catch(error => console.log(error))
    }
  }
}
</script>