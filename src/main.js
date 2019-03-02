import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

  let app = '';
  firebase.initializeApp({
    apiKey: "AIzaSyADHGbytJVul8TjtmVcuey4WFQPS2hmcvo",
    authDomain: "pruebaautenticacion-56947.firebaseapp.com",
    databaseURL: "https://pruebaautenticacion-56947.firebaseio.com",
    projectId: "pruebaautenticacion-56947",
    storageBucket: "pruebaautenticacion-56947.appspot.com",
    messagingSenderId: "1073707139939"
  });
  //firebase.initializeApp(config);
  //firebase.database();
 //const db = firebase.database();
  //const ref = db.ref("answers");
export const db = firebase.database();
export const answers = db.ref('answers').orderByChild('questionId');


/*new Vue({
  router,
  render: h => h(App)
}).$mount('#app')*/
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			render: h => h(App)
		}).$mount('#app')
	}
});

