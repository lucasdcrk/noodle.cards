import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './index.css';

Vue.config.productionTip = false;
Vue.use(Vuex);

const config = require('./constants');
const web3js = require('web3');
const web3 = new web3js('https://bsc-dataseed1.binance.org:443');

Vue.prototype.config = config;
Vue.prototype.web3 = web3;
Vue.prototype.contract = new web3.eth.Contract(config.abi, config.contractAddress);
Vue.prototype.ethereum = window.ethereum;

const store = new Vuex.Store({
  state: {
    account: window.ethereum ? window.ethereum.selectedAddress : null
  },
  mutations: {
    setAccount(state, n) {
      state.account = n;
    }
  }
});

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app');
