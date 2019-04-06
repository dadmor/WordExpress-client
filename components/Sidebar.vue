<template>
  <div class="sidebar">
    {{name}}
    <Filters />
  </div>
</template>

<script>
import Filters from '~/components/Filters.vue';

export default {
  components: {
    Filters
  },
  data() {
    return {
      name: 'sidebar'
    };
  }
}
</script>

<style scoped>
  .sidebar {
    position: fixed;
    width: 20%;
    height: 80%;
    top: 10%;
    right: 50px;
    background: #fff;
    z-index: 2;
  }
</style>