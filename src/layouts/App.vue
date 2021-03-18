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
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!--
                Icon when menu is closed.

                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!--
                Icon when menu is open.

                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
          <a href="#" class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</a>
          <a href="#" class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Team</a>
          <a href="#" class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Projects</a>
          <a href="#" class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Calendar</a>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=l28H8Z9jWr&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">Tom Cook</div>
              <div class="text-sm font-medium text-gray-500">tom@example.com</div>
            </div>
            <button class="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Your Profile</a>
            <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Settings</a>
            <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Sign out</a>
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