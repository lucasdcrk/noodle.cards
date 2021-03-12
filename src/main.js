import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './index.css';

Vue.config.productionTip = false;
Vue.use(Vuex);

let web3 = require('web3-eth');
let instance = new web3(web3.givenProvider);

Vue.prototype.web3 = instance;
Vue.prototype.eth = window.ethereum;

//const contract = require('./assets/abi.json');

const store = new Vuex.Store({
  state: {
    account: window.ethereum.selectedAddress
  },
  mutations: {
    setAccount(state, n) {
      state.account = n;
    }
  }
})

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app');
