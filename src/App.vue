<template>
  <div id="app">
    
    <nav>
      <div class="nav-wrapper black darken-1">
        <a href="#" class="brand-logo center">Seleção</a>
      </div>
    </nav>

    <div class="container">
      
      <p v-if="errors != ''">
             <ul>
               <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <li v-for="(error, index) of errors" :key="index">{{error.defaultMessage}}</li>
            </ul>
      </p>

      <form @submit.prevent="salvar">
          <br>
          <label>Nome</label>
          <input type="text" placeholder="Inserir Nome" v-model="pessoa.nome">
          <label>Idade</label>
          <input type="number" placeholder="Idade atual" v-model="pessoa.idade">
          <label>Email</label>
          <input type="email" placeholder="Email" v-model="pessoa.email">
          <label>Foto</label>
           <div class="file-field input-field">
                <div class="btn">
                  <span>Adicionar Foto</span>
                  <input type="file" @change="updateProfile">
               </div>
               <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
            </div>
            <label>Escolaridade: </label>
              <div class="input-field">
                  <select v-model="pessoa.escolaridade">
                    <option value="" disabled selected>Escolha uma Escolaridade</option>
                    <option v-for="escolaridade of opcoes" :key="escolaridade">{{escolaridade}}</option>
                  </select>
              </div>

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>IDADE</th>
            <th>EMAIL</th>
            <th>FOTO</th>
            <th>ESCOLARIDADE</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="pessoa of formulario" :key="pessoa.id">

            <td>{{pessoa.nome}}</td>
            <td>{{pessoa.idade}}</td>
            <td>{{pessoa.email}}</td>
            <td><img class="materialboxed responsive-img" width="75" :src="pessoa.foto"></td>
            <td>{{pessoa.escolaridade}}</td>
            <td>
              <button @click="editar(pessoa)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(pessoa)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Formulario from './services/formulario'

export default {
  
  data(){
    return {
      pessoa:{
        id:'',
        nome:'',
        idade:'',
        email:'',
        foto:'',
        escolaridade:''
      },
      formulario: [],
      opcoes: ['Ensino Fundamental','Ensino Medio','Ensino Superior'],
      errors: [],
      profile:''
      
    }
  },

  mounted(){
    this.listar()
  },
  
  computed: {
    myImage(){
      return 'data:image/png;base64, ${this.image}'
    }
  },
  created (){
    this.loadImage()
  },

  methods:{

    listar(){

      Formulario.listar().then(resposta => {
      this.formulario = resposta.data
      })
    },
    
    salvar(){
      if(!this.pessoa.id){
        Formulario.salvar(this.pessoa).then(resposta => {
        this.pessoa = {}
        alert('salvo com sucessso')
        this.resposta = resposta 
        this.listar()
        this.errors = []
      }).catch(e => {
        this.errors = e.response.data.errors
        alert('Erro ao salvar')
      })
      }else{
        Formulario.atualizar(this.pessoa).then(resposta => {
        this.pessoa = {}
        alert('Atualizado com sucessso')
        this.resposta = resposta 
        this.listar()
        this.errors = []
      }).catch(e => {
        this.errors = e.response.data.errors
        alert('Erro ao salvar')
      })
      }

        
  },

    editar(pessoa){
      this.pessoa = pessoa
    },

    remover(pessoa){

      if(confirm('Deseja apagar o formulario?')){
        Formulario.apagar(pessoa).then(resposta =>{
        this.resposta = resposta
        this.listar();
        this.errors = []
      }).catch(e=>{
        this.errors = e.response.data.errors
        alert('Erro ao apagar')
      })
    }

      },

      updateProfile(event){

      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        this.file = file
        this.pessoa.foto = reader.result;
      }
      reader.readAsDataURL(file)
      },

      loadImage(){
        this.image=this.pessoa.foto.result
      }
      
}}

</script>

<style>

</style>