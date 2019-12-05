<template>
  <div>
    <div align="center">
      <h2>Livro</h2>
    </div>
    <div class="row">
      <div class="col-sm-4" v-if="bool">
        <form @submit.prevent="cadastrar">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" class="form-control" required autofocus v-model="nome"/>
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea class="form-control" id="descricao" rows="3" required v-model="descricao"></textarea>
          </div>
          <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input class="form-control" id="quantidade" type="number" required v-model="quantidade"/>
          </div>
          <button v-if="bool" class="btn btn-success btn-sm form-control" type="submit">Cadastrar</button>
        </form>
      </div>
      <div class="col-sm-4" v-if="!bool">
        <form @submit.prevent="salvar">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" class="form-control" required autofocus v-model="nome">
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea class="form-control" id="descricao" rows="3" required v-model="descricao"></textarea>
          </div>
          <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input class="form-control" id="quantidade" type="number" required v-model="quantidade"/>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <button class="btn btn-primary btn-sm form-control" type="submit">Salvar</button>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-danger btn-sm form-control" @click="cancelar()">Cancelar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-8">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Alterar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in livros" :key="l.id">
              <td scope="row">{{ l.id }}</td>
              <td>{{ l.nome }}</td>
              <td>{{ l.descricao }}</td>
              <td>{{ l.quantidade }}</td>
              <td width="1%"><button type="button" class="btn btn-warning btn-sm" @click="alterar(l)">Alterar</button></td>
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
        quantidade: '',
        indice: 0,
        livros: [],
        bool: true
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
              descricao: this.descricao,
              quantidade: this.quantidade
            })
            .then(res => {
              this.nome = ''
              this.descricao = ''
              this.quantidade = ''
              this.atualizar()
            })
            .catch(error => console.log(error))
      },
      salvar() {
        axios.post('livro/alterar', {
              id: this.indice,
              nome: this.nome,
              descricao: this.descricao,
              quantidade: this.quantidade
            })
            .then(res => {
              this.bool = true
              this.indice = 0
              this.nome = ''
              this.descricao = ''
              this.quantidade = ''
              this.atualizar()
            })
            .catch(error => console.log(error))
      },
      excluir(indice) {
        this.indice = indice
        axios.delete('/livro/excluir?id=' + indice, {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            //console.log(res)
            this.atualizar()
          })
          .catch(error => console.log(error))
      },
      alterar(livro) {
        this.bool = false
        this.indice = livro.id
        this.nome = livro.nome
        this.descricao = livro.descricao
        this.quantidade = livro.quantidade
      },
      cancelar() {
        this.bool = true
        this.indice = 0
        this.nome = ''
        this.descricao = ''
        this.quantidade = ''
      },
      atualizar() {
        axios.get('/livro/getAll', {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(res => {
            //console.log(res)
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