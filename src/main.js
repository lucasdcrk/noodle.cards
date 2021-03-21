import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './index.css';

Vue.config.productionTip = false;
Vue.use(Vuex);

const config = require('./constants');
const web3js = require('web3');
const web3 = new web3js(web3js.givenProvider);

Vue.prototype.bus = new Vue();
Vue.prototype.config = config;
Vue.prototype.web3 = web3;
Vue.prototype.contract = new web3.eth.Contract(config.tokenAbi, config.tokenAddress);
Vue.prototype.farmingContract = new web3.eth.Contract(config.farmingAbi, config.farmingAddress);
Vue.prototype.swapContract = new web3.eth.Contract(config.swapAbi, config.swapAddress);
Vue.prototype.ethereum = window.ethereum;

//window.ethereum.enable();

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
