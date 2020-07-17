import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'


new Vue({
  render: h => h(App),
}).$mount('#app');
      const gauthOption = {
        clientId: '328263404641-a5ani7vhi3tasbiil0hftei7n14iisco.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'select_account'
      }
      Vue.use(GAuth, gauthOption)