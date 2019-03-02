<template>
  <b-container fluid>
   <b-row id="encabezado"></b-row>
   <b-row class="login">
    <!--<b-col md="2"></b-col>-->
    <b-col sm="12">
     <h3>Iniciar Sesión</h3>
     <b-form-input type="text" v-model="email" placeholder="Email" /><br>
     <b-input class ="centrar" type="password" v-model="password" placeholder="Password" /><br>
     <b-button variant="danger" @click="login">Aceptar</b-button>
     <p>Si no tienes una cuenta, puedes crearla
     <router-link to="/sing-up">crear cuenta</router-link>
     </p>
     <p>
       También puedes iniciar sesion con Google o Facebook<br>
       <button @click="loginGoogle" class="social-button">
          <img alt="Google Logo" src="../assets/google.png"> 
       </button>
       <button @click="loginFacebook" class="social-button">
          <img alt="Facebook Logo" src="../assets/facebook.png"> 
       </button>
     </p>
     </b-col>
     <!--<b-col md="2"></b-col>-->
     <!--<p>
       Iniciar sesion con Facebook<br>
       <button @click="loginFacebook" class="social-button">
          <img alt="Facebook Logo" src="../assets/facebook.png"> 
       </button>
     </p>-->
   </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase';
const provider = new firebase.auth.GoogleAuthProvider();
const providerFace = new firebase.auth.FacebookAuthProvider();
export default {
  name: 'login',
  data(){
    return{
      email: '',
      password: ''
    };
  },
  methods:{
    login: function() {
      //this.$router.replace('home');
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            //alert("Estas conectado")
            this.$router.replace('home')
          },
          (err) => {
            alert("Algo salio mal: " + err.message)
          }
        );
    },
    loginGoogle(){
      //const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('home')
      }).catch((err) => {
        alert("Algo salio mal: " + err.message)
      });

    },
    loginFacebook(){
      //const providerFace = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(providerFace).then((result) => {
        this.$router.replace('home')
      }).catch((err) => {
        alert("Algo salio mal: " + err.message)
      });

    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 40px;
  /*margin: 0 auto;
  border: 1px solid black;
  width: 40%;*/
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
.social-button{
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0,2);
  outline: 0;
  border: 0;
}
.social-button:active{
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0,1);
}
.social-button img{
  width: 100%;
}
.form-control {
    display: inline-block;
}
</style>
