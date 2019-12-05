<template>
  <div>
    <div align="center">
      <h2>Reservar Livro</h2>
    </div>
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Reservar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in livros" :key="l.id">
              <td scope="row">{{ l.nome }}</td>
              <td>{{ l.descricao }}</td>
              <td width="1%"><button type="button" class="btn btn-success btn-sm" @click="reservar(l)">Reservar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-2"></div>
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
        livros: []
      }
    },
    computed: {
      ...mapState([
        'usuario'
      ])
    },
    methods: {
      reservar(livro) {
        axios.post('reserva/cadastrar', {
              data: new Date(),
              livro: livro,
              usuario: this.usuario
            })
            .then(res => {
              this.atualizar()
            })
            .catch(error => console.log(error))
      },
      atualizar() {
        axios.get('/livro/getAllDisponiveis', {
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