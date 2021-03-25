<template>
  <div>
    <nav class="bg-white shadow">
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
              <navbar-link to="/open-pack">
                Open pack
              </navbar-link>
              <navbar-link to="/collection">
                Collection
              </navbar-link>
              <a href="https://guide.noodle.cards" target="_blank" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Guide
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="flex-shrink-0">
              <a v-if="!$store.state.hasMetamask" href="https://metamask.io/download.html" target="_blank" class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Install Metamask
              </a>
              <button v-else-if="!$store.state.isConnected" @click="connect" class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Connect
              </button>
              <div v-else-if="$store.state.balance !== null" class="flex gap-1">
                <div class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                  Balance: {{parseFloat($store.state.balance).toFixed(0)}} NDL
                </div>
                <div v-if="$store.state.rewards" class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                  Harvest: {{parseFloat($store.state.rewards).toFixed(3)}} NDL
                </div>
              </div>
              <div v-else>
                Loading ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="pt-5 pb-10">
      <slot/>
    </div>
  </div>
</template>

<script>
import NavbarLink from '@/components/NavbarLink';

export default {
  components: {NavbarLink},
  methods: {
    async connect() {
      await this.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }
}
</script>