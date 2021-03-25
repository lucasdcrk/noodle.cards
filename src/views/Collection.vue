<template>
  <app>
    <div v-if="$store.state.isConnected">
      <div v-if="cards && wallets">
        <div v-if="owned === null || owned.length === 0">
          <div class="max-w-xl mx-auto py-16 text-center">
            <div class="max-w-xs my-10 mx-auto">
              <h3 class="text-2xl font-medium text-gray-900">
                No cards in your collection
              </h3>
              <p class="mt-3 leading-5 text-gray-500">
                Cards are obtained by opening cards pack in the appropriate section.
              </p>
            </div>
          </div>
        </div>
        <div v-else class="max-w-xl mx-auto py-16">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="card in wallet" :key="card.name">
              <img :src="card.image" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="max-w-xl mx-auto py-16 text-center">
          <img class="mx-auto" width="100px" src="/loader.svg" alt="">
        </div>
      </div>
    </div>
    <div v-else>
      <div class="max-w-xl mx-auto py-16 text-center">
        <img class="w-1/2 mx-auto" src="/undraw_secure_login_pdn4.svg" alt="">
        <div class="max-w-xs my-10 mx-auto">
          <h3 class="text-2xl font-medium text-gray-900">
            Please connect with MetaMask
          </h3>
          <p class="mt-3 leading-5 text-gray-500">
            MetaMask connection is required in order to access your collection.
          </p>
        </div>
        <div class="text-sm leading-5 text-gray-400">
          The connect button is located on the top right of each page.
        </div>
      </div>
    </div>
  </app>
</template>

<script>
import App from '../layouts/App';

export default {
  components: {
    App
  },
  data() {
    return {
      cards: null,
      wallets: null,
      owned: null,
      wallet: []
    }
  },
  methods: {
    async fetchCards() {
      this.cards = await fetch('https://lucasdcrk.github.io/packs.noodle.cards/cards.json').then(r => r.json());
      this.wallets = await fetch('https://lucasdcrk.github.io/packs.noodle.cards/wallets.json').then(r => r.json());

      let user = this.wallets.find(x => {
        return x.address.toLowerCase() === this.$store.state.account.toLowerCase();
      });

      if (user) {
        this.owned = user.wallet;
        this.owned.forEach(o => {
          this.wallet.push(this.cards[o])
        });
      } else
        this.owned = [];
    }
  },
  mounted() {
    if (this.$store.state.isConnected)
      this.fetchCards();
  }
}
</script>