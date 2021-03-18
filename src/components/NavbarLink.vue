<template>
  <router-link
    :to="to"
    :class="activeClass"
    class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
  >
    <slot/>
  </router-link>
</template>

<script>
export default {
  props: {
    to: String,
  },
  computed: {
    activeClass() {
      if (this.to === this.$route.path) {
        return 'border-indigo-500 text-gray-900';
      }
      return 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
    }
  }
}
</script>