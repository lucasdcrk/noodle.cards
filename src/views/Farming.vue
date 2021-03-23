<template>
  <app>
    <div class="max-w-xl mx-auto">
      <div v-if="currentAPR" class="bg-blue-50 border-l-4 border-blue-400 p-4 mt-2">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              <span class="font-bold">APR</span><br>
              Current APR is: {{currentAPR.toFixed(2)}}%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$store.state.isConnected">
      <div v-if="isApproved === null || stakedAmount === null">
        <div class="max-w-xl mx-auto py-16 text-center">
          <div class="max-w-xs my-10 mx-auto">
            <h3 class="text-2xl font-medium text-gray-900">
              Fetching contract
            </h3>
            <p class="mt-3 leading-5 text-gray-500">
              We are checking for permission to manage your NDL-BNB LP tokens, please wait a few seconds.
            </p>
          </div>
          <div class="text-sm leading-5">
            <img class="mx-auto" width="100px" src="/loader.svg" alt="">
          </div>
        </div>
      </div>
      <div v-else-if="isApproved">
        <div class="max-w-xl mx-auto py-32">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div v-if="parseFloat(stakedAmount) === 0">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Stake amount
                </h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Enter the amount of tokens you want to stake, you will be able to unstake them later.
                  </p>
                </div>
                <div v-if="typeof availableStake !== 'undefined'" class="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                  Available: {{parseFloat(availableStake).toFixed(2)}} NDL-BNB LP
                </div>
                <div v-if="isStaking !== true">
                  <div class="mt-5 sm:flex sm:items-center sm:w-2/3 sm:mx-auto">
                    <div class="w-full">
                      <div class="flex justify-between">
                        <label for="amount" class="block text-sm font-medium text-gray-700">Amount to stake</label>
                        <button @click="stakeAmount = availableStake" class="text-sm text-gray-500">MAX</button>
                      </div>
                      <input id="amount" type="number" min="1" max="100000" v-model="stakeAmount" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="1000 LP">
                    </div>
                  </div>
                  <button @click="stake" class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                    Stake
                  </button>
                </div>
                <img v-else class="mx-auto my-5" width="50px" src="/loader.svg" alt="">
              </div>
              <div v-else>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Current stake
                </h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    You can recover your LP tokens by using the "Unstake" button.
                  </p>
                </div>
                <div class="mt-5">
                  <div class="text-center my-10">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Stacked amount
                    </dt>
                    <dd class="mt-1 text-3xl font-semibold text-gray-900">
                      {{web3.utils.fromWei(stakedAmount, 'ether')}} NDL-BNB LP
                    </dd>
                  </div>
                  <div v-if="!isHarvesting && !isUnstaking">
                    <button @click="harvest" class="my-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Harvest
                    </button>
                    <button @click="unstake" class="my-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Unstake
                    </button>
                  </div>
                  <img v-else class="mx-auto" width="50px" src="/loader.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="max-w-xl mx-auto py-16 text-center">
          <img class="w-1/2 mx-auto" src="/undraw_agreement_aajr.svg" alt="">
          <div class="max-w-xs my-10 mx-auto">
            <h3 class="text-2xl font-medium text-gray-900">
              Approve the contract
            </h3>
            <p class="mt-3 leading-5 text-gray-500">
              This will allow us to manage your LP tokens, you can revoke this authorization at any time.
            </p>
          </div>
          <div class="text-sm leading-5">
            <button
                v-if="!isApproving"
                @click="approve"
                class="bg-gray-800 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-900"
            >
              Continue with MetaMask
            </button>
            <img v-else class="mx-auto" width="100px" src="/loader.svg" alt="">
          </div>
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
            MetaMask connection is required in order to access farming.
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
      isApproved: null,
      isApproving: false,
      isStaking: false,
      isUnstaking: false,
      isHarvesting: false,
      stakeAmount: 0,
      stakedAmount: null,
      currentAPR: null,
      availableStake: 0
    }
  },
  methods: {
    async updateApprovalStatus() {
      this.swapContract.methods.allowance(this.$store.state.account, this.config.farmingAddress).call()
      .then((response) => {
        this.isApproved = response > 0;
      });
    },
    async updateAvailableStake() {
      this.availableStake = this.web3.utils.fromWei(await this.swapContract.methods.balanceOf(this.$store.state.account).call(), 'ether');
    },
    async approve() {
      this.isApproving = true;

      this.swapContract.methods.approve(this.config.farmingAddress, '1000000000000000000000000')
      .send({
        from: this.$store.state.account,
      })
      .then(() => this.updateApprovalStatus())
      .catch(e => alert('Unable to approve contract, error: ' + e.message))
      .finally(() => this.isApproving = false);
    },
    async stake() {
      this.isStaking = true;

      this.farmingContract.methods.stake(this.web3.utils.toWei(this.stakeAmount, 'ether')).send({
        from: this.$store.state.account
      })
      .then(() => this.updateStakedAmount())
      .catch(e => alert('Unable to process stake transaction, error: ' + e.message))
      .finally(() => this.isStaking = false);
    },
    async updateStakedAmount() {

      await this.farmingContract.methods.pairBal(this.$store.state.account).call()
      .then(result => this.stakedAmount = result);
    },
    async unstake() {
      this.isUnstaking = true;

      await this.farmingContract.methods.unstake().send({
        from: this.$store.state.account
      })
      .then(() => this.updateStakedAmount())
      .catch(e => alert('Unable to process unstake transaction, error: ' + e.message))
      .finally(() => this.isUnstaking = false)
    },
    async harvest() {
      this.isHarvesting = true;

      await this.farmingContract.methods.harvest().send({
        from: this.$store.state.account
      })
      .then(() => alert('Harvest successful!'))
      .catch(e => alert('Unable to process harvest transaction, error: ' + e.message))
      .finally(() => this.isHarvesting = false);
    },
    async updateAPR() {
      let minted = await this.farmingContract.methods.mintedPerBlock().call();
      let totalStaked = await this.farmingContract.methods.totalStaked().call();

      minted = minted / (34.43 * totalStaked);
      minted *= 30000;
      minted *= 36500;
      this.currentAPR = minted - 100;
    },
    updateData() {
      this.updateApprovalStatus();
      this.updateStakedAmount();
      this.updateAvailableStake();
    }
  },
  mounted() {
    if (this.$store.state.isConnected) {
      this.updateData();
    }

    this.bus.$on('changedAccount', () => this.updateData());

    this.updateAPR();
  }
}
</script>