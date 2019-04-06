<template>
  <section class="container">
    <Map />
    <Sidebar />
  </section>
</template>

<script>
import Map from '~/components/Map.vue'
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Map,
    Sidebar
  },
}
</script>

<style scoped>
  .container {
    position: relative;
  }
</style>