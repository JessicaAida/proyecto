<template>
<b-container fluid>
 <b-row id="encabezado"></b-row>
 <b-row class="singup">
  <b-col sm="12">
     <h3>Registro</h3>
     <b-form-input type="text" v-model="email" placeholder="Email" /><br>
     <b-form-input type="password" v-model="password" placeholder="Password" /><br>
     <b-button variant="danger" @click="singUp">Aceptar</b-button>
     <p><router-link to="/login">Iniciar Sesión</router-link></p>
  </b-col>
 </b-row>
</b-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'singup',
  data(){
    return{
      email: '',
      password:''
    };
  },
  methods:{
    singUp: function(){
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(
          (user) => {
            //alert("Estas conectado")
            this.$router.replace('home')
          },
          (err) => {
            alert("Algo salio mal: " + err.message)
          }
        );
    }
  }
}
</script>

<style scoped>
.singup {
  margin-top: 40px;
}
#encabezado{
  background-color: #5caceb;
  height: 50px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.form-control {
    display: inline-block;
}
</style>
