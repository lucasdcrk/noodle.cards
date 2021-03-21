<template>
  <app>
    <button @click="approve">Approve</button>
    <button @click="harvest">Harvest</button>
  </app>
</template>

<script>
import App from '../layouts/App';

export default {
  components: {
    App
  },
  methods: {
    async approve() {
      let accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });

      this.swapContract.methods.approve(this.config.farmingAddress, '1000000000000000000000000')
      .send({
        from: accounts[0],
      });
    },
    async harvest() {
      console.log(this.contract.methods);
      let accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });

      this.contract.methods.harvest()
      .send({
        from: accounts[0]
      });
    },
    async approves() {
      let accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });

      this.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: this.config.swapAddress,
              value: '0',
              data: '0x095ea7b300000000000000000000000005ff2b0db69458a0750badebc4f9e13add608c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            }
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error(error));
    },
    async transfer() {

    }
  }
}
</script>