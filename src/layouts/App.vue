<template>
  <div>
    <nav class="bg-white shadow border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto" src="https://media.discordapp.net/attachments/490602677324087296/819623003745681408/noooooooooodle.png">
              <img class="hidden lg:block h-8 w-auto" src="https://media.discordapp.net/attachments/490602677324087296/819623003745681408/noooooooooodle.png">
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <navbar-link to="/">
                Home
              </navbar-link>
              <navbar-link to="/farming">
                Farming
              </navbar-link>
              <a href="https://guide.noodle.cards" target="_blank" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Guide
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="flex-shrink-0">
              <button v-if="!$store.state.account" @click="connect" class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Connect
              </button>
              <div v-else-if="balance !== null">
                Balance: {{balance}} NDL
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="bg-gray-50 py-5">
      <slot/>
    </div>

    <div class="bg-white">
      <div class="max-w-screen-xl mx-auto py-7 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="md:order-2">

        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base leading-6 text-gray-400">
            &copy; 2021 NoodleCards. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarLink from '@/components/NavbarLink';

export default {
  components: {NavbarLink},
  data() {
    return {
      balance: null
    }
  },
  methods: {
    async connect() {
      let accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });

      await this.$store.commit('setAccount', {
        account: accounts[0]
      });

      await this.updateBalance();
    },
    async updateBalance() {
      this.balance = await this.contract.methods.balanceOf(this.$store.state.account).call();
      this.balance = this.web3.utils.fromWei(this.balance, 'ether');
    }
  },
  mounted() {
    if (this.$store.state.account)
      this.updateBalance();
  }
}
</script>