<template>
  <app>
    <div v-if="$store.state.isConnected">
      <div v-if="!loading">
        <div class="max-w-xl mx-auto py-16 text-center">
          <div class="max-w-xs my-10 mx-auto">
            <h3 class="text-2xl font-medium text-gray-900">
              Open a cards pack
            </h3>
            <p class="mt-3 mb-10 leading-5 text-gray-500">
              Open packs in order to win cards, which you can see in your collection.
            </p>
            <button
                v-if="canOpenFreePack"
                @click="openFreePack"
                class="mx-2 bg-gray-800 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-900"
            >
              Open free pack
            </button>
            <button
                @click="openPack"
                class="mx-2 bg-gray-800 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-900"
            >
              Open pack
            </button>
            <img width="250px" class="mt-5 mx-auto" src="https://media.discordapp.net/attachments/820269838030078002/824775291846000660/Testpack2.png?width=868&height=1302" alt="">
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
            MetaMask connection is required in order to access wallet.
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
      loading: false,
      canOpenFreePack: false
    }
  },
  methods: {
    async openPack() {
      this.loading = true;

      await this.cardsContract.methods.openPack().send({
        from: this.$store.state.account
      })
      .then(() => alert('Pack opened successfully, check your wallet in a few minutes.'))
      .catch(e => alert('Error while opening pack: ' + e.message))
      .finally(() => this.loading = false);
    },
    async openFreePack() {
      this.loading = true;

      await this.cardsContract.methods.openFreePack().send({
        from: this.$store.state.account
      })
          .then(() => alert('Free pack opened successfully, check your wallet in a few minutes.'))
          .catch(e => alert('Error while opening free pack: ' + e.message))
          .finally(() => this.loading = false);
    },
    async checkIfCanOpenFreePack() {
      await this.cardsContract.methods.freePackOpened(this.$store.state.account).call()
          .then(v => this.canOpenFreePack = !v);
    }
  },
  mounted() {
    this.checkIfCanOpenFreePack();
  }
}
</script>
