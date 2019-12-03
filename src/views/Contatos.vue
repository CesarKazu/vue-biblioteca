<template>
  <div>
    <div align="center">
      <h2>Contato</h2>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <form @submit.prevent="cadastrar">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" class="form-control" required autofocus v-model="nome">
          </div>
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="text" id="telefone" class="form-control" required autofocus v-model="telefone">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" class="form-control" required autofocus v-model="email">
          </div>
          <div class="form-group">
            <label for="endereco">Endereço</label>
            <textarea id="endereco" class="form-control" required v-model="endereco">
                                                            </textarea>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
        </form>
      </div>
      <div class="col-sm-8">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Data</th>
              <th scope="col">Usuário</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ant in contatos" :key="ant.id">
              <td scope="row">{{ ant.id }}</td>
              <td>{{ ant.nome }}</td>
              <td>{{ ant.telefone }}</td>
              <td>{{ ant.email }}</td>
              <td>{{ ant.endereco }}</td>
              <td>{{ ant.data }}</td>
              <td>{{ ant.usuario.nome }}</td>
              <td>
                <button type="button" class="btn btn-warning btn-xs" @click="alterar(ant.id)">Alterar</button>
                <br>
                <button type="button" class="btn btn-danger btn-xs" @click="excluir(ant.id)">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'
  
  export default {
    name: 'contatos',
    data() {
      return {
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        contato: '',
        indice: 0,
        contatos: []
      }
    },
    computed: {
      ...mapState([
        'usuario'
      ])
    },
    methods: {
      cadastrar() {
        if (this.contato == '') {
          axios.post('contato/save', {
              nome: this.nome,
              telefone: this.telefone,
              email: this.email,
              endereco: this.endereco,
              usuario: this.usuario
            })
            .then(res => {
              this.nome = ''
              this.telefone = ''
              this.email = ''
              this.endereco = ''
              this.atualizar()
            })
            .catch(error => console.log(error))
        } else {
          axios.get('contato/alterar?id=' + this.indice + '/nome=' + this.nome + '/telefone=' + this.telefone + '/email=' + this.email + '/endereco=' + this.endereco, {
              headers: {
                Accept: 'application/json'
              }
            })
            .then(res => {
              console.log(res)
              this.indice = 0
              this.nome = ''
              this.telefone = ''
              this.email = ''
              this.endereco = ''
              this.atualizar()
            })
            .catch(error => console.log(error))
        }
      },
      excluir(indice) {
        this.indice = indice
        axios.delete('/contato/delete?id=' + indice, {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            console.log(res)
            this.atualizar()
          })
          .catch(error => console.log(error))
      },
      alterar(indice) {
        axios.get('/contato/getById?id=' + indice, {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            console.log(res)
            this.contato = res.data
            this.nome = this.contato.nome
            this.telefone = this.contato.telefone
            this.email = this.contato.email
            this.endereco = this.contato.endereco
          })
          .catch(error => console.log(error))
      },
      atualizar() {
        axios.get('/contato/getAllById?id=' + this.usuario.id, {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            console.log(res)
            this.contatos = res.data
          })
          .catch(error => console.log(error))
      }
    },
    created() {
      this.atualizar()
    }
  }
</script>