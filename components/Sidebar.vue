<template>
  <div class="sidebar">
    <Filters />
    <PlacesList />
    <PlaceContent />
  </div>
</template>

<script>
import Filters from '~/components/Filters.vue';
import PlacesList from '~/components/PlacesList.vue';
import PlaceContent from '~/components/PlaceContent.vue';

export default {
  components: {
    Filters,
    PlacesList,
    PlaceContent
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
    display: flex;
    flex-flow: row;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0;
    z-index: 2;
  }
</style>