<template>
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <form @submit.prevent="cadastrar">
        <div align="center">
          <h2>Cadastrar Usuário</h2>
        </div>
        <div class="form-group">
          <label for="username">Usuário</label>
          <input type="text" id="nome" class="form-control" required autofocus v-model="nome">
        </div>
        <div class="form-group">
          <label for="inputPassword">Senha</label>
          <input type="password" id="senha" class="form-control" required v-model="senha">
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
      </form>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'
  
  export default {
    name: 'usuarios',
    data() {
      return {
        nome: '',
        senha: ''
      }
    },
    computed: {
      ...mapState([
        'usuario'
      ])
    },
    methods: {
      cadastrar() {
        let newUsuario = {
          "nome": this.nome.toLowerCase().replace(' ', ''),
          "senha": this.senha,
          "autorizacoes": [{
            "id": "1",
            "nome": "ROLE_USUARIO"
          }]
        }
        axios.post('contato/save', newUsuario, {})
          .then(res => {
            this.nome = ''
            this.senha = ''
          })
          .catch(error => console.log(error))
      },
      async salvar() {
        let newUsuario = {
          "nome": this.nome.toLowerCase().replace(' ', ''),
          "senha": this.senha,
          "autorizacoes": [{
            "id": "1",
            "nome": "ROLE_USUARIO"
          }]
        }
        try {
          let response = await this.$http.post('usuario/save',
            newUsuario)
          alert(
            'Sucesso',
            'cadastrado com sucesso',
            'success'
          )
        } catch (error) {
          console.log(error.response)
          alert(
            'Erro',
            'Erro ao salvar',
            'error'
          )
        }
      }
    }
  }
</script>