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

const contract = new web3.eth.Contract(config.tokenAbi, config.tokenAddress);
const farmingContract = new web3.eth.Contract(config.farmingAbi, config.farmingAddress);
const swapContract = new web3.eth.Contract(config.swapAbi, config.swapAddress);
const ethereum = window.ethereum;

Vue.prototype.config = config;
Vue.prototype.web3 = web3;
Vue.prototype.contract = contract;
Vue.prototype.farmingContract = farmingContract;
Vue.prototype.swapContract = swapContract;
Vue.prototype.ethereum = ethereum;

const store = new Vuex.Store({
  state: {
    hasMetamask: typeof ethereum !== 'undefined',
    isConnected: ethereum && ethereum.isConnected(),
    account: null,
    balance: null
  },
  mutations: {
    setAccount(state, n) {
      state.account = n;
    },
    setBalance(state, n) {
      state.balance = web3.utils.fromWei(n, 'ether');
    }
  }
});

if (typeof ethereum !== 'undefined') {
  ethereum.on('accountsChanged', (accounts) => {
    store.commit('setAccount', accounts[0] ?? null);

    contract.methods.balanceOf(accounts[0]).call().then(value => {
      store.commit('setBalance', value);
    });
  });

  ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  if (ethereum.selectedAddress) {
    store.commit('setAccount', ethereum.selectedAddress);

    contract.methods.balanceOf(ethereum.selectedAddress).call().then(value => {
      store.commit('setBalance', value);
    });
  }
}

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app');
