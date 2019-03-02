<template>
<b-container fluid>
 <b-row id="encabezado">
  <b-col sm="10"></b-col>
  <b-col sm="2">
    <b-button variant="danger" id="salir" @click="logout">Cerrar Sesión</b-button>
  </b-col>
 </b-row>
 <b-row>
  <b-col sm="12" class="home">
    <div id="datos" ref="datos"></div>
    <div id="tester" ref="tester"></div>
  </b-col>
 </b-row>
</b-container>
</template>
<script>
// @ is an alias to /src
import firebase from 'firebase';
import plotly from 'plotly.js/dist/plotly';
import HelloWorld from '@/components/HelloWorld.vue';
import BootstrapVue from 'bootstrap-vue';

var IdPregunta;
var idUnicos;

export default {
  name: 'home',
  mounted: function () {

  //firebase.initializeApp(config);

    var TESTER = this.$refs.tester;
    var divDatos = this.$refs.datos;
    //alert(TESTER);
    
    var auxpreguntas = "";
    var resTrue= 0,contTrue = 0; 
    var resFalse=0, contFalse = 0;
    var index =  0;

    var db = firebase.database();
    var questionIdRef = db.ref("answers").orderByChild('questionId');
    var buscarPorIdRef = "", IdPregunta="";
    //console.log("questionIdRef: "+questionIdRef);

    questionIdRef.on('value', function(snapshot) {
      //console.log("1: ");
        snapshot.forEach(function(item) {
            var itemVal = item.val().questionId;
            auxpreguntas = auxpreguntas +","+itemVal;
            //auxpreguntas[index] = parseInt(item.val().questionId);
            //index++;
        });
        //divDatos.innerText = auxpreguntas;
        IdPregunta = auxpreguntas.split(",");
        idUnicos = Array.from(new Set(IdPregunta));

        //console.log(idUnicos);
        contadores(idUnicos,TESTER);
        

    });
    
  },
  methods: {
  	logout: function(){
  		firebase.auth().signOut().then(() => {this.$router.replace('login')}
      )}
  }
};


function contadores(idUnicos,TESTER){
  var db = firebase.database();
  var resTrue= 0,contTrue = 0; 
  var resFalse=0, contFalse = 0;
  var index =  0;
  var arrRespCorrect;
  var arrRespIncorret;
  var intaux= 0;
  //var TESTER = this.$refs.tester;
  //console.log(arregloValores);
 
  for (var i = 1; i < idUnicos.length; i++) {
    index = parseInt(idUnicos[i]);
    //console.log("index: "+index);
    var buscarPorIdRef = db.ref("answers").orderByChild('questionId').equalTo(index);
    buscarPorIdRef.on('value', function(snapshot) {
      snapshot.forEach(function(item) {
          var itemVal = item.val().right;
          if (itemVal == true) {
            contTrue++;
          }else{
            if (itemVal == false) {
              contFalse++;
            }
          };
      });
      resFalse = resFalse +","+ contFalse;
      resTrue = resTrue +","+ contTrue;
      
      if(i==idUnicos.length-1){
        grafica(idUnicos,TESTER,resTrue,resFalse);
      }
    });
    
    contFalse = 0;
    contTrue = 0;
  };
  
}

function grafica(idUnicos,TESTER,resTrue,resFalse){
  var arrRespCorrect = resTrue.split(",");
  var arrRespIncorret = resFalse.split(",");
  var aciertos = {
      x: arrRespCorrect,
      y: idUnicos,
      /*width:200,
    height:300,
    autosize:false,*/
      type: 'bar',
      text: arrRespCorrect,
      orientation: 'h',
      textposition: 'auto',
      hoverinfo: 'y',
      opacity: 0.5,
      name: 'Aciertos',
      marker: {
        color: 'rgb(158,202,225)',
        line: {
          color: 'rbg(8,48,107)',
          width: 1.5
        }
      }
    };

    var errores = {
      x: arrRespIncorret,
      y: idUnicos,
      /*width:200,
    height:300,
    autosize:false,*/
      type: 'bar',
      text: arrRespIncorret,
      orientation: 'h',
      textposition: 'auto',
      hoverinfo: 'y',
      name: 'Errores',
      marker: {
        color: 'rgba(255, 160, 122,.5)',
        line: {
          color: 'rbg(8,48,107)',
          width: 1.5
        }
      }
    };

    var data = [aciertos,errores];

    var layout = {
      title: 'Cantidad de Errores y Aciertos por pregunta',
      barmode: 'stack',
      size: 40,
      xaxis: {
        title: 'Cantidad Respuestas',
        titlefont: {
          color: 'black',
          size: 18
        },
        rangemode: 'tozero'
      },
      yaxis: {
        title: 'ID preguntas',
        titlefont: {
          color: 'black',
          size: 18
        },
        rangemode: 'tozero'
      }
    };
    plotly.newPlot(TESTER, data,layout, {responsive: true});
}

</script>
<style scoped>
#tester {
  margin: 0 auto;
  border: 1px solid white;
  height: 205vh;
  min-height: 400px;
}
#encabezado{
  background-color: #5caceb;
  height: 50px;
  padding-top: 5px;
}
#salir{
  float: right;
}
@media (min-width: 570) {
    #encabezado {
        padding-top: 1px;
    }
}
</style>