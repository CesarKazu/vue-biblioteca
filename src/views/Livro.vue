<template>
  <div>
    <div align="center">
      <h2>Livro</h2>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <form @submit.prevent="cadastrar">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" class="form-control" required autofocus v-model="nome">
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea class="form-control" id="descricao" rows="3" required v-model="descricao"></textarea>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
        </form>
      </div>
      <div class="col-sm-8">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in livros" :key="l.id">
              <td scope="row">{{ l.id }}</td>
              <td>{{ l.nome }}</td>
              <td>{{ l.descricao }}</td>
              <td width="1%"><button type="button" class="btn btn-warning btn-sm" @click="alterar(l.id)">Alterar</button></td>
              <td width="1%"><button type="button" class="btn btn-danger btn-sm" @click="excluir(l.id)">Deletar</button></td>
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
    name: 'livros',
    data() {
      return {
        nome: '',
        descricao: '',
        indice: 0,
        livros: []
      }
    },
    computed: {
      ...mapState([
        'usuario'
      ])
    },
    methods: {
      cadastrar() {
        axios.post('livro/cadastrar', {
              nome: this.nome,
              descricao: this.descricao
            })
            .then(res => {
              this.nome = ''
              this.descricao = ''
              this.atualizar()
            })
            .catch(error => console.log(error))
        /* if (this.livro == '') {
          
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
        } */
      },
      excluir(indice) {
        this.indice = indice
        axios.delete('/livro/excluir?id=' + indice, {
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
        axios.get('/livro/getAll', {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            console.log(res)
            this.livros = res.data
          })
          .catch(error => console.log(error))
      }
    },
    created() {
      this.atualizar()
    }
  }
</script>