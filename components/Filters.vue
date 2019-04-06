<template>
  <div>
    {{name}}
    <select v-model="city">
      <option v-for="item in filters.city" :key="item.term_id" v-bind:value="item.term_id" v-text="item.name" />
    </select>
    <select v-model="dzielnica" v-if="childWithCity">
      <option v-for="item2 in childWithCity.child" :key="item2.term_id" v-text="item2.name" />
    </select>
  </div>
</template>

<script>
import Filters from '~/components/Filters.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Filters
  },
  data() {
    return {
      name: 'Filters',
      city: '',
      dzielnica: ''
    };
  },
  computed: {
    childWithCity() {
      return this.filters.city.filter(x => x.term_id === this.city)[0];
    },
    ...mapState({
      filters: state => {return state.filters}
    })
  }
}
</script>