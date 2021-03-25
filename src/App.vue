<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    if (window.ethereum.selectedAddress) {
      this.$store.commit('setIsConnected', true);
      this.$store.commit('setAccount', window.ethereum.selectedAddress);
    }
  }
}
</script>